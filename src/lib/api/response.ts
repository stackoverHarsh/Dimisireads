import { NextResponse } from 'next/server';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: Record<string, unknown>;
}

export function apiSuccess<T>(data: T, meta?: Record<string, unknown>, status: number = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      meta,
    },
    { status }
  );
}

export function apiError(
  message: string,
  code: string = 'BAD_REQUEST',
  status: number = 400,
  details?: unknown
) {
  return NextResponse.json<ApiResponse<never>>(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}

export function apiUnauthorized(message: string = 'Authentication required') {
  return apiError(message, 'UNAUTHORIZED', 401);
}

export function apiForbidden(message: string = 'You do not have permission to perform this action') {
  return apiError(message, 'FORBIDDEN', 403);
}

export function apiNotFound(message: string = 'The requested resource was not found') {
  return apiError(message, 'NOT_FOUND', 404);
}

export function apiValidationError(details: unknown, message: string = 'Validation failed') {
  return apiError(message, 'VALIDATION_ERROR', 422, details);
}

export function apiRateLimited(message: string = 'Too many requests. Please slow down.') {
  return apiError(message, 'RATE_LIMITED', 429);
}
