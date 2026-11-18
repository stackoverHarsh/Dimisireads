import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/guards';
import { apiSuccess, apiError } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';
import { AdminService } from '@/services/admin.service';
import { LicenceCategory } from '@prisma/client';

const verifyLicenceSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  category: z.nativeEnum(LicenceCategory),
  licensorName: z.string().min(2, 'Licensor entity or provenance source is legally mandatory'),
  licensorContactEmail: z.string().email().optional(),
  licenceAgreementRef: z.string().optional(),
  territorialRights: z.string().default('WORLDWIDE'),
  licenceDocumentUrl: z.string().optional(),
  legalNotes: z.string().optional(),
  isDownloadAllowed: z.boolean().default(true),
  isOnlineReadAllowed: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await validateBody(req, verifyLicenceSchema);

    // Hard server-side guardrail check
    if (!['PUBLIC_DOMAIN', 'DIMISI_OWNED', 'EXPLICIT_DISTRIBUTION_GRANTED', 'OPEN_PERMISSIVE'].includes(body.category)) {
      return apiError(
        'Licence Verification Failed: Only the 4 approved legal categories can be authorized for distribution.',
        'LEGAL_COMPLIANCE_ERROR',
        400
      );
    }

    const result = await AdminService.verifyAndPublishLicence(admin.id, body);
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
