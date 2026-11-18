import { requireAdmin } from '@/lib/auth/guards';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { AdminService } from '@/services/admin.service';

export async function GET() {
  try {
    await requireAdmin();
    const [kpis, analytics, recentLogs] = await Promise.all([
      AdminService.getOverviewKPIs(),
      AdminService.getAnalyticsData(),
      AdminService.getActivityLogs(6),
    ]);

    return apiSuccess({ kpis, analytics, recentLogs });
  } catch (error) {
    return handleApiError(error);
  }
}
