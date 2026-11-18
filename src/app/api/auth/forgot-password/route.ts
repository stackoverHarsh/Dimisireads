import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AuthService } from '@/services/auth.service';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, forgotPasswordSchema);
    await AuthService.requestPasswordReset(body.email);

    return apiSuccess({
      message: 'If an account exists for this email, a reset missive has been dispatched.',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
