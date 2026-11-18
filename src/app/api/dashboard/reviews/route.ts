import { getCurrentUser } from '@/lib/auth/guards';
import { apiSuccess, apiUnauthorized } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { DashboardService } from '@/services/dashboard.service';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const reviews = await DashboardService.getUserReviews(user.id);
    return apiSuccess({ reviews });
  } catch (error) {
    return handleApiError(error);
  }
}
