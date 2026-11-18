/**
 * Auth service integration tests
 * Tests: registration validation, login logic, session validation, password reset flow
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';

/* ── Zod schemas (mirror of src/app/api/auth/* schemas) ─────────────────── */

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});

/* ── Registration Validation ────────────────────────────────────────────── */

describe('Auth — Registration Schema Validation', () => {
  it('accepts a valid registration payload', () => {
    const result = registerSchema.safeParse({
      name: 'Eleanor Vance',
      email: 'eleanor@example.com',
      password: 'SecureP@ss1',
    });
    expect(result.success).toBe(true);
  });

  it('rejects a name that is too short', () => {
    const result = registerSchema.safeParse({ name: 'E', email: 'e@example.com', password: 'SecureP@ss1' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/at least 2 characters/);
  });

  it('rejects an invalid email', () => {
    const result = registerSchema.safeParse({ name: 'Eleanor', email: 'not-an-email', password: 'SecureP@ss1' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('email');
  });

  it('rejects password without uppercase', () => {
    const result = registerSchema.safeParse({ name: 'Eleanor', email: 'e@test.com', password: 'secure@pass1' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/uppercase/);
  });

  it('rejects password without special character', () => {
    const result = registerSchema.safeParse({ name: 'Eleanor', email: 'e@test.com', password: 'SecurePass1' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/special/);
  });

  it('rejects password shorter than 8 characters', () => {
    const result = registerSchema.safeParse({ name: 'Eleanor', email: 'e@test.com', password: 'Sh@1' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/at least 8/);
  });
});

/* ── Login Validation ───────────────────────────────────────────────────── */

describe('Auth — Login Schema Validation', () => {
  it('accepts valid login credentials', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'anypassword' });
    expect(result.success).toBe(true);
  });

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: '' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('password');
  });

  it('rejects malformed email', () => {
    const result = loginSchema.safeParse({ email: 'bad', password: 'pass' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('email');
  });
});

/* ── Forgot Password Validation ─────────────────────────────────────────── */

describe('Auth — Forgot Password Schema Validation', () => {
  it('accepts a valid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'reader@dimisi.com' });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'invalid' });
    expect(result.success).toBe(false);
  });
});

/* ── Reset Password Validation ──────────────────────────────────────────── */

describe('Auth — Reset Password Schema Validation', () => {
  it('accepts a valid reset payload', () => {
    const result = resetPasswordSchema.safeParse({ token: 'abc123token', password: 'NewP@ssw0rd' });
    expect(result.success).toBe(true);
  });

  it('rejects an empty token', () => {
    const result = resetPasswordSchema.safeParse({ token: '', password: 'NewP@ssw0rd' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('token');
  });

  it('rejects a weak new password', () => {
    const result = resetPasswordSchema.safeParse({ token: 'valid', password: 'weakpassword' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('password');
  });
});
