import { NextRequest } from 'next/server';
import { z, ZodSchema } from 'zod';
import { ValidationError } from './errors';

export async function validateBody<T>(req: NextRequest, schema: ZodSchema<T>): Promise<T> {
  try {
    const rawBody = await req.json();
    return schema.parse(rawBody);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
    throw new ValidationError('Invalid JSON body payload');
  }
}

export function validateQuery<T>(req: NextRequest, schema: ZodSchema<T>): T {
  const url = new URL(req.url);
  const searchParamsObject = Object.fromEntries(url.searchParams.entries());
  return schema.parse(searchParamsObject);
}

export function validateParams<T>(params: unknown, schema: ZodSchema<T>): T {
  return schema.parse(params);
}
