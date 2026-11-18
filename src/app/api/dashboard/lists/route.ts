import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth/guards';
import { apiSuccess, apiUnauthorized } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { DashboardService } from '@/services/dashboard.service';
import { validateBody } from '@/lib/api/validation';

const createListSchema = z.object({
  name: z.string().min(2, 'List title must be at least 2 characters'),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const lists = await DashboardService.getUserReadingLists(user.id);
    return apiSuccess({ lists });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const body = await validateBody(req, createListSchema);
    const list = await DashboardService.createReadingList(user.id, body.name, body.description, body.isPublic);

    return apiSuccess({ list, message: 'Reading list created successfully' }, undefined, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
