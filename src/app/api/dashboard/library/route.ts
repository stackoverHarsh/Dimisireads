import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth/guards';
import { apiSuccess, apiUnauthorized } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { DashboardService } from '@/services/dashboard.service';
import { validateBody } from '@/lib/api/validation';
import { ReadingStatus } from '@prisma/client';

const updateShelfSchema = z.object({
  bookId: z.string().min(1),
  status: z.nativeEnum(ReadingStatus),
});

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get('status') as ReadingStatus | null;

    const books = await DashboardService.getUserLibrary(user.id, statusParam || undefined);
    return apiSuccess({ books });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const body = await validateBody(req, updateShelfSchema);
    const result = await DashboardService.updateBookShelf(user.id, body.bookId, body.status);

    return apiSuccess({ result, message: `Volume moved to ${body.status}` });
  } catch (error) {
    return handleApiError(error);
  }
}
