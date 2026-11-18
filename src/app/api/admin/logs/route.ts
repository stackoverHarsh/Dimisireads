import { requireAdmin } from '@/lib/auth/guards';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { AdminService } from '@/services/admin.service';

export async function GET() {
  try {
    await requireAdmin();
    const logs = await AdminService.getActivityLogs(50);
    return apiSuccess({ logs });
  } catch (error) {
    return handleApiError(error);
  }
}
