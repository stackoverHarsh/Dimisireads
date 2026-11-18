import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth/guards';
import { apiSuccess, apiUnauthorized, apiError } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { DigitalInventoryService } from '@/services/digital-inventory.service';
import { BOOKS_SEED } from '@/lib/dev-seed/books';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return apiUnauthorized('You must be signed in to read in the scholar sanctum.');
    }

    const { slug } = await params;
    const access = await DigitalInventoryService.verifyDigitalAccess(user.id, slug, 'READ');

    if (!access.allowed) {
      return apiError(
        access.reason || 'This title is not available for online reading due to copyright and licence restrictions.',
        'LICENSING_RESTRICTION',
        403
      );
    }

    const bookSeed = BOOKS_SEED.find((b) => b.slug === slug || b.id === slug);

    return apiSuccess({
      access,
      book: bookSeed,
      legalNotice: access.licenceNotice,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
