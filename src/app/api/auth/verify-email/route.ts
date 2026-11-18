import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AuthService } from '@/services/auth.service';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Token is required.'),
  email: z.string().email('Valid email is required.'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, verifyEmailSchema);
    const result = await AuthService.verifyEmail(body.token, body.email);

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
