import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { apiError, apiValidationError } from './response';

export class AppError extends Error {
  constructor(
    public override message: string,
    public code: string = 'INTERNAL_ERROR',
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Permission denied') {
    super(message, 'FORBIDDEN', 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: unknown) {
    super(message, 'VALIDATION_ERROR', 422, details);
  }
}

export class LicensingError extends AppError {
  constructor(message: string = 'Licensing compliance violation or unverified asset') {
    super(message, 'LICENSING_VIOLATION', 403);
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error('[API Error caught]:', error);

  if (error instanceof ZodError) {
    const formatted = error.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    return apiValidationError(formatted);
  }

  if (error instanceof AppError) {
    return apiError(error.message, error.code, error.statusCode, error.details);
  }

  if (error instanceof Error) {
    return apiError(
      process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message,
      'INTERNAL_SERVER_ERROR',
      500
    );
  }

  return apiError('Unknown internal server error', 'UNKNOWN_ERROR', 500);
}
