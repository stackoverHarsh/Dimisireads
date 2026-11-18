import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth/guards';
import { apiSuccess, apiUnauthorized, apiError } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { DigitalInventoryService } from '@/services/digital-inventory.service';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return apiUnauthorized('You must be signed in to download verified e-books.');
    }

    const { slug } = await params;
    const ipAddress = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'DimisiReads-Client';

    const downloadInfo = await DigitalInventoryService.requestSignedDownload(
      user.id,
      slug,
      ipAddress,
      userAgent
    );

    return apiSuccess({
      downloadUrl: downloadInfo.downloadUrl,
      expiresAt: downloadInfo.expiresAt,
      expiresInSeconds: downloadInfo.expiresInSeconds,
      filename: downloadInfo.filename,
      licenceNotice: downloadInfo.licenceNotice,
      message: 'Time-limited signed download URL generated successfully (valid for 10 minutes).',
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('copyright')) {
      return apiError(error.message, 'LICENSING_RESTRICTION', 403);
    }
    return handleApiError(error);
  }
}
