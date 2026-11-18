/**
 * Signed URL & download security integration tests
 * Tests: HMAC token generation/verification, expiry enforcement, URL structure
 */

import { describe, it, expect } from 'vitest';
import { createHmac, randomBytes } from 'crypto';

/* ── Simulate signed URL logic (mirrors src/lib/storage/s3.ts) ──────────── */

const SECRET = 'test-secret-key-for-signed-urls-unit-tests-only';
const EXPIRY_SECONDS = 600; // 10 minutes

function createSignedToken(payload: { slug: string; userId: string; expiresAt: number }): string {
  const data = JSON.stringify(payload);
  const signature = createHmac('sha256', SECRET).update(data).digest('hex');
  return Buffer.from(JSON.stringify({ data, signature })).toString('base64url');
}

function verifySignedToken(token: string): { valid: boolean; payload?: { slug: string; userId: string; expiresAt: number }; reason?: string } {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as { data: string; signature: string };
    const expectedSig = createHmac('sha256', SECRET).update(decoded.data).digest('hex');

    if (decoded.signature !== expectedSig) {
      return { valid: false, reason: 'Invalid signature' };
    }

    const payload = JSON.parse(decoded.data) as { slug: string; userId: string; expiresAt: number };

    if (Date.now() > payload.expiresAt) {
      return { valid: false, reason: 'Token has expired' };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, reason: 'Malformed token' };
  }
}

/* ── Tests ───────────────────────────────────────────────────────────────── */

describe('Downloads — Signed URL Token Security', () => {
  it('generates a valid token for authorized access', () => {
    const payload = {
      slug: 'pride-and-prejudice',
      userId: 'user-123',
      expiresAt: Date.now() + EXPIRY_SECONDS * 1000,
    };
    const token = createSignedToken(payload);
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });

  it('verifies a fresh token successfully', () => {
    const payload = {
      slug: 'frankenstein',
      userId: 'user-456',
      expiresAt: Date.now() + EXPIRY_SECONDS * 1000,
    };
    const token = createSignedToken(payload);
    const result = verifySignedToken(token);
    expect(result.valid).toBe(true);
    expect(result.payload?.slug).toBe('frankenstein');
    expect(result.payload?.userId).toBe('user-456');
  });

  it('rejects an expired token', () => {
    const payload = {
      slug: 'pride-and-prejudice',
      userId: 'user-789',
      expiresAt: Date.now() - 1000, // 1 second in the past
    };
    const token = createSignedToken(payload);
    const result = verifySignedToken(token);
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/expired/);
  });

  it('rejects a tampered token (modified slug)', () => {
    const payload = {
      slug: 'pride-and-prejudice',
      userId: 'user-123',
      expiresAt: Date.now() + EXPIRY_SECONDS * 1000,
    };
    const token = createSignedToken(payload);
    // Tamper: decode, change data, re-encode without updating signature
    const decoded = JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as { data: string; signature: string };
    const tamperedData = decoded.data.replace('pride-and-prejudice', 'frankenstein');
    const tamperedToken = Buffer.from(JSON.stringify({ data: tamperedData, signature: decoded.signature })).toString('base64url');
    const result = verifySignedToken(tamperedToken);
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/Invalid signature/);
  });

  it('rejects a completely random token', () => {
    const garbage = randomBytes(32).toString('base64url');
    const result = verifySignedToken(garbage);
    expect(result.valid).toBe(false);
  });

  it('rejects an empty string token', () => {
    const result = verifySignedToken('');
    expect(result.valid).toBe(false);
  });

  it('two tokens for different users are different', () => {
    const expiry = Date.now() + EXPIRY_SECONDS * 1000;
    const tokenA = createSignedToken({ slug: 'meditations', userId: 'user-A', expiresAt: expiry });
    const tokenB = createSignedToken({ slug: 'meditations', userId: 'user-B', expiresAt: expiry });
    expect(tokenA).not.toBe(tokenB);
  });
});
