import { requireAdmin } from '@/lib/auth/guards';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { AdminService } from '@/services/admin.service';

export async function GET() {
  try {
    await requireAdmin();
    const marketing = await AdminService.getMarketingData();
    return apiSuccess({ marketing });
  } catch (error) {
    return handleApiError(error);
  }
}
