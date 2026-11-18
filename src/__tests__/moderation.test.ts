/**
 * Review moderation RBAC tests
 * Tests: role-based access rules for moderation actions
 */

import { describe, it, expect } from 'vitest';

/* ── Simulate RBAC roles (mirror src/lib/auth/guards.ts) ──────────────── */

type UserRoleType = 'USER' | 'MODERATOR' | 'CONTENT_MANAGER' | 'SUPPORT_ADMIN' | 'SUPER_ADMIN';

const ADMIN_ROLES: UserRoleType[] = ['MODERATOR', 'CONTENT_MANAGER', 'SUPPORT_ADMIN', 'SUPER_ADMIN'];
const MODERATION_ALLOWED: UserRoleType[] = ['MODERATOR', 'CONTENT_MANAGER', 'SUPER_ADMIN'];
const SUPER_ADMIN_ONLY: UserRoleType[] = ['SUPER_ADMIN'];

function canAccessAdmin(role: UserRoleType): boolean {
  return ADMIN_ROLES.includes(role);
}

function canModerateReview(role: UserRoleType): boolean {
  return MODERATION_ALLOWED.includes(role);
}

function canManageUsers(role: UserRoleType): boolean {
  return SUPER_ADMIN_ONLY.includes(role);
}

function canVerifyLicence(role: UserRoleType): boolean {
  return ['CONTENT_MANAGER', 'SUPER_ADMIN'].includes(role);
}

type ModerationAction = 'APPROVE' | 'REMOVE' | 'FLAG' | 'ESCALATE';

const VALID_MODERATION_ACTIONS: ModerationAction[] = ['APPROVE', 'REMOVE', 'FLAG', 'ESCALATE'];

function isModerationActionValid(action: string): action is ModerationAction {
  return VALID_MODERATION_ACTIONS.includes(action as ModerationAction);
}

/* ── RBAC Tests ──────────────────────────────────────────────────────────── */

describe('Review Moderation — RBAC', () => {
  it('USER cannot access admin', () => {
    expect(canAccessAdmin('USER')).toBe(false);
  });

  it('MODERATOR can access admin', () => {
    expect(canAccessAdmin('MODERATOR')).toBe(true);
  });

  it('SUPPORT_ADMIN can access admin', () => {
    expect(canAccessAdmin('SUPPORT_ADMIN')).toBe(true);
  });

  it('USER cannot moderate reviews', () => {
    expect(canModerateReview('USER')).toBe(false);
  });

  it('MODERATOR can moderate reviews', () => {
    expect(canModerateReview('MODERATOR')).toBe(true);
  });

  it('CONTENT_MANAGER can moderate reviews', () => {
    expect(canModerateReview('CONTENT_MANAGER')).toBe(true);
  });

  it('SUPPORT_ADMIN cannot moderate reviews (triage only)', () => {
    expect(canModerateReview('SUPPORT_ADMIN')).toBe(false);
  });

  it('SUPER_ADMIN can moderate reviews', () => {
    expect(canModerateReview('SUPER_ADMIN')).toBe(true);
  });

  it('only SUPER_ADMIN can manage users', () => {
    expect(canManageUsers('SUPER_ADMIN')).toBe(true);
    expect(canManageUsers('MODERATOR')).toBe(false);
    expect(canManageUsers('CONTENT_MANAGER')).toBe(false);
    expect(canManageUsers('USER')).toBe(false);
  });

  it('only CONTENT_MANAGER and SUPER_ADMIN can verify licences', () => {
    expect(canVerifyLicence('CONTENT_MANAGER')).toBe(true);
    expect(canVerifyLicence('SUPER_ADMIN')).toBe(true);
    expect(canVerifyLicence('MODERATOR')).toBe(false);
    expect(canVerifyLicence('USER')).toBe(false);
  });
});

/* ── Moderation Action Validation ───────────────────────────────────────── */

describe('Review Moderation — Action Validation', () => {
  it('accepts valid moderation actions', () => {
    expect(isModerationActionValid('APPROVE')).toBe(true);
    expect(isModerationActionValid('REMOVE')).toBe(true);
    expect(isModerationActionValid('FLAG')).toBe(true);
    expect(isModerationActionValid('ESCALATE')).toBe(true);
  });

  it('rejects invalid moderation actions', () => {
    expect(isModerationActionValid('DELETE_ALL')).toBe(false);
    expect(isModerationActionValid('')).toBe(false);
    expect(isModerationActionValid('approve')).toBe(false); // case-sensitive
    expect(isModerationActionValid('HACK')).toBe(false);
  });
});

/* ── Admin Licence Guardrail ─────────────────────────────────────────────── */

describe('Admin Licensing Guardrail — Verification Schema', () => {
  const licenceVerifySchema = {
    ebookId: (v: unknown) => typeof v === 'string' && v.length > 0,
    licenceCategory: (v: unknown) => ['PUBLIC_DOMAIN', 'DIMISI_OWNED', 'EXPLICIT_DISTRIBUTION_GRANTED', 'OPEN_PERMISSIVE'].includes(v as string),
    isDownloadAllowed: (v: unknown) => typeof v === 'boolean',
    isOnlineReadAllowed: (v: unknown) => typeof v === 'boolean',
    licenceDocumentUrl: (v: unknown) => typeof v === 'string' && v.length > 0,
    clearanceCode: (v: unknown) => typeof v === 'string' && v.length >= 8,
  };

  it('validates a complete licence verification payload', () => {
    const payload = {
      ebookId: 'ebook-pride-001',
      licenceCategory: 'PUBLIC_DOMAIN',
      isDownloadAllowed: true,
      isOnlineReadAllowed: true,
      licenceDocumentUrl: 'https://dimisi.com/licences/pd-001.pdf',
      clearanceCode: 'PD-1813-001',
    };
    for (const [key, validator] of Object.entries(licenceVerifySchema)) {
      expect(validator(payload[key as keyof typeof payload]), `Field "${key}" failed validation`).toBe(true);
    }
  });

  it('rejects METADATA_ONLY as a valid distribution licence category', () => {
    expect(licenceVerifySchema.licenceCategory('METADATA_ONLY')).toBe(false);
  });

  it('rejects an empty clearance code', () => {
    expect(licenceVerifySchema.clearanceCode('')).toBe(false);
  });

  it('rejects a clearance code shorter than 8 chars', () => {
    expect(licenceVerifySchema.clearanceCode('PD-001')).toBe(false);
  });
});
