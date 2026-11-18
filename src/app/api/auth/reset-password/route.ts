import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AuthService } from '@/services/auth.service';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required.'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, resetPasswordSchema);
    const result = await AuthService.resetPassword(body.token, body.newPassword);

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
