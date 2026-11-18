import { redirect } from 'next/navigation';
import { UserRoleType } from '@prisma/client';
import { getSessionTokenFromCookies } from './cookies';
import { AuthService } from '@/services/auth.service';
import { ForbiddenError } from '@/lib/api/errors';

export async function getCurrentUser() {
  const sessionToken = await getSessionTokenFromCookies();
  if (!sessionToken) return null;

  const result = await AuthService.validateSession(sessionToken);
  return result?.user ?? null;
}

export async function requireAuth(callbackUrl?: string) {
  const user = await getCurrentUser();
  if (!user) {
    const loginUrl = callbackUrl
      ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : '/login';
    redirect(loginUrl);
  }
  return user;
}

export async function requireRole(allowedRoles: UserRoleType[], callbackUrl?: string) {
  const user = await requireAuth(callbackUrl);

  const hasRole = user.roles.some((r) => allowedRoles.includes(r as UserRoleType));
  if (!hasRole) {
    throw new ForbiddenError('You do not possess the required archival clearance to access this sanctum.');
  }

  return user;
}

export async function requireAdmin(callbackUrl?: string) {
  return requireRole(
    [
      UserRoleType.SUPER_ADMIN,
      UserRoleType.CONTENT_MANAGER,
      UserRoleType.MODERATOR,
      UserRoleType.SUPPORT_ADMIN,
    ],
    callbackUrl
  );
}
