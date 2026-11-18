import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import prisma from '@/lib/prisma';
import { env } from '@/lib/env';
import { UserRoleType } from '@prisma/client';
import { EmailService } from './email.service';
import { AppError, UnauthorizedError, ValidationError } from '@/lib/api/errors';

const JWT_KEY = new TextEncoder().encode(env.JWT_SECRET);
const SESSION_EXPIRY_DAYS = 30;

export interface JWTPayload {
  userId: string;
  email: string;
  roles: UserRoleType[];
}

export class AuthService {
  /**
   * Hash a plaintext password
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   * Compare plaintext password with stored hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Issue a signed JWT for API or Edge verification
   */
  static async signToken(payload: JWTPayload, expiresIn: string = '30d'): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(JWT_KEY);
  }

  /**
   * Verify and decode a JWT
   */
  static async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_KEY);
      return payload as unknown as JWTPayload;
    } catch {
      return null;
    }
  }

  /**
   * Create a persistent database session
   */
  static async createSession(userId: string, userAgent?: string, ipAddress?: string) {
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

    const session = await prisma.session.create({
      data: {
        userId,
        sessionToken,
        userAgent,
        ipAddress,
        expiresAt,
      },
    });

    return { sessionToken, expiresAt, session };
  }

  /**
   * Invalidate a session (Logout)
   */
  static async invalidateSession(sessionToken: string): Promise<void> {
    try {
      await prisma.session.delete({
        where: { sessionToken },
      });
    } catch {
      // Ignore if session already deleted
    }
  }

  /**
   * Validate a session token and return user with assigned roles
   */
  static async validateSession(sessionToken: string) {
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: {
          include: {
            roles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });

    if (!session || session.expiresAt < new Date() || !session.user.isActive) {
      return null;
    }

    return {
      session,
      user: {
        ...session.user,
        roles: session.user.roles.map((r) => r.role.name),
      },
    };
  }

  /**
   * Register a new user
   */
  static async register(data: {
    email: string;
    password: string;
    fullName: string;
    username: string;
  }) {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (existingEmail) {
      throw new ValidationError('A reader with this email address already holds a sanctum account.');
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: data.username.toLowerCase() },
    });
    if (existingUsername) {
      throw new ValidationError('This username is already taken. Please choose another title.');
    }

    const passwordHash = await this.hashPassword(data.password);

    // Ensure default USER role exists
    const userRole = await prisma.role.upsert({
      where: { name: UserRoleType.USER },
      update: {},
      create: {
        name: UserRoleType.USER,
        description: 'Standard library reader',
      },
    });

    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash,
        fullName: data.fullName,
        username: data.username.toLowerCase(),
        roles: {
          create: {
            roleId: userRole.id,
          },
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    // Generate and dispatch verification email
    const verificationToken = await this.createVerificationToken(user.email);
    await EmailService.sendVerificationEmail(user.email, verificationToken);

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      roles: user.roles.map((r) => r.role.name),
    };
  }

  /**
   * Authenticate user with credentials
   */
  static async login(
    emailOrUsername: string,
    passwordPlain: string,
    userAgent?: string,
    ipAddress?: string
  ) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername.toLowerCase() },
          { username: emailOrUsername.toLowerCase() },
        ],
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedError('Invalid email/username or password.');
    }

    if (!user.isActive) {
      throw new AppError('This sanctum account has been frozen. Please contact library archivists.', 'ACCOUNT_DISABLED', 403);
    }

    const isMatch = await this.verifyPassword(passwordPlain, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email/username or password.');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const sessionData = await this.createSession(user.id, userAgent, ipAddress);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        avatarUrl: user.avatarUrl,
        isEmailVerified: user.isEmailVerified,
        roles: user.roles.map((r) => r.role.name),
      },
      sessionToken: sessionData.sessionToken,
      expiresAt: sessionData.expiresAt,
    };
  }

  /**
   * Create an email verification token (24-hour validity)
   */
  static async createVerificationToken(email: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Delete any old tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email.toLowerCase() },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token,
        expiresAt,
      },
    });

    return token;
  }

  /**
   * Verify an email address via token
   */
  static async verifyEmail(token: string, email: string) {
    const record = await prisma.verificationToken.findFirst({
      where: {
        token,
        identifier: email.toLowerCase(),
      },
    });

    if (!record || record.expiresAt < new Date()) {
      throw new ValidationError('This verification token is invalid or has expired.');
    }

    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });

    // Delete token after successful use
    await prisma.verificationToken.delete({
      where: { id: record.id },
    });

    return { success: true, message: 'Email successfully illuminated and verified.' };
  }

  /**
   * Generate password reset token and dispatch email
   */
  static async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success even if user not found to prevent user enumeration
    if (!user) {
      return { success: true };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.deleteMany({
      where: { email: email.toLowerCase() },
    });

    await prisma.passwordResetToken.create({
      data: {
        email: email.toLowerCase(),
        token,
        expiresAt,
      },
    });

    await EmailService.sendPasswordResetEmail(user.email, token);
    return { success: true };
  }

  /**
   * Reset password with valid token
   */
  static async resetPassword(token: string, newPasswordPlain: string) {
    const record = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!record || record.expiresAt < new Date()) {
      throw new ValidationError('Password reset token is invalid or has expired.');
    }

    const passwordHash = await this.hashPassword(newPasswordPlain);

    await prisma.user.update({
      where: { email: record.email },
      data: { passwordHash },
    });

    // Remove token after reset
    await prisma.passwordResetToken.delete({
      where: { id: record.id },
    });

    return { success: true, message: 'Your password key has been updated successfully.' };
  }
}
