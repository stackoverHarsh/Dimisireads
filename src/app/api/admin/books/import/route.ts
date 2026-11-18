import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/guards';
import { apiSuccess, apiError } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { AdminService } from '@/services/admin.service';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return apiError('Search query must be at least 2 characters', 'INVALID_QUERY', 400);
    }

    const results = await AdminService.searchExternalMetadata(query);
    return apiSuccess({ results });
  } catch (error) {
    return handleApiError(error);
  }
}
