import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth/guards';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';
import { AdminService } from '@/services/admin.service';
import { UserRoleType } from '@prisma/client';

const moderationActionSchema = z.object({
  reviewId: z.string().min(1),
  action: z.enum(['APPROVE', 'HIDE', 'DELETE']),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    await requireRole([
      UserRoleType.SUPER_ADMIN,
      UserRoleType.CONTENT_MANAGER,
      UserRoleType.MODERATOR,
    ]);

    const queue = await AdminService.getModerationQueue();
    return apiSuccess({ queue });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole([
      UserRoleType.SUPER_ADMIN,
      UserRoleType.CONTENT_MANAGER,
      UserRoleType.MODERATOR,
    ]);

    const body = await validateBody(req, moderationActionSchema);
    const result = await AdminService.moderateReview(
      admin.id,
      body.reviewId,
      body.action,
      body.notes
    );

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
