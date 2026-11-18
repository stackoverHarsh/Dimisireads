import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth/guards';
import { apiSuccess, apiUnauthorized } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { DashboardService } from '@/services/dashboard.service';
import { validateBody } from '@/lib/api/validation';

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const body = await validateBody(req, updateProfileSchema);
    const updated = await DashboardService.updateProfile(user.id, body);

    return apiSuccess({ user: updated, message: 'Your scholar profile has been updated.' });
  } catch (error) {
    return handleApiError(error);
  }
}
