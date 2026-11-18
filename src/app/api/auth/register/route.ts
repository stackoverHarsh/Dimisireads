import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AuthService } from '@/services/auth.service';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';

const registerSchema = z.object({
  email: z.string().email('Please provide a valid scholarly email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .max(30, 'Username cannot exceed 30 characters.')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username may only contain letters, numbers, and underscores.'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, registerSchema);
    const user = await AuthService.register(body);

    return apiSuccess(
      {
        user,
        message: 'Account created successfully. A verification missive has been dispatched to your email.',
      },
      undefined,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
