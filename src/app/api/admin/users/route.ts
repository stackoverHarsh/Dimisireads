import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireAdmin, requireRole } from '@/lib/auth/guards';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';
import { AdminService } from '@/services/admin.service';
import { UserRoleType } from '@prisma/client';

const roleUpdateSchema = z.object({
  targetUserId: z.string().min(1),
  role: z.nativeEnum(UserRoleType),
});

const statusToggleSchema = z.object({
  targetUserId: z.string().min(1),
  isActive: z.boolean(),
});

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || undefined;
    const role = searchParams.get('role') || undefined;

    const users = await AdminService.getUsersList(query, role);
    return apiSuccess({ users });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Only SUPER_ADMIN can assign or elevate admin roles
    const admin = await requireRole([UserRoleType.SUPER_ADMIN]);
    const body = await validateBody(req, roleUpdateSchema);

    const result = await AdminService.updateUserRole(admin.id, body.targetUserId, body.role);
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await validateBody(req, statusToggleSchema);

    const result = await AdminService.toggleUserStatus(admin.id, body.targetUserId, body.isActive);
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
