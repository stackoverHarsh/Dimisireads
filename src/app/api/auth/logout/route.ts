import { AuthService } from '@/services/auth.service';
import { clearSessionCookie, getSessionTokenFromCookies } from '@/lib/auth/cookies';
import { apiSuccess } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';

export async function POST() {
  try {
    const sessionToken = await getSessionTokenFromCookies();
    if (sessionToken) {
      await AuthService.invalidateSession(sessionToken);
    }

    await clearSessionCookie();

    return apiSuccess({
      message: 'You have safely departed from the sanctum.',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
