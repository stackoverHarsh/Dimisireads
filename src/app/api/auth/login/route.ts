import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AuthService } from '@/services/auth.service';
import { setSessionCookie } from '@/lib/auth/cookies';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Please enter your email or username.'),
  password: z.string().min(1, 'Please enter your password.'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, loginSchema);
    const userAgent = req.headers.get('user-agent') ?? undefined;
    const ipAddress = req.headers.get('x-forwarded-for') ?? undefined;

    const { user, sessionToken, expiresAt } = await AuthService.login(
      body.emailOrUsername,
      body.password,
      userAgent,
      ipAddress
    );

    // Set secure HTTP-only session cookie
    await setSessionCookie(sessionToken, expiresAt);

    return apiSuccess({
      user,
      message: 'Welcome back to your sanctum.',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
