import { ZodError, ZodObject } from 'zod';
import { baseObjectOutputType, ZodRawShape } from 'zod/lib/types';
import { NextRequest, NextResponse } from 'next/server';
import { NextRequestContext } from '@app/../../types/core.type';
import { ZodIssue } from 'zod/lib/ZodError';

export type RequestDataContext<T> = NextRequestContext & {
  data: T;
};

type ValidationErrorResponse = {
  message: string;
  errors: ZodIssue[];
};

const getErrorResponse = (error: ZodError): ValidationErrorResponse => {
  const message = error.issues[0].message ?? 'Something went wrong';

  return {
    message,
    errors: error.errors
  };
};

export const withValidation = <T extends ZodRawShape>(
  zod: ZodObject<T>,
  next: (
    req: NextRequest,
    ctx: RequestDataContext<baseObjectOutputType<T>>
  ) => Promise<NextResponse>
): ((
  req: NextRequest,
  ctx: RequestDataContext<baseObjectOutputType<T>>
) => Promise<NextResponse>) => {
  return async (req: NextRequest, ctx: NextRequestContext) => {
    // TODO Remove the bellow json parse after the https://github.com/vercel/next.js/issues/48096 is fixed
    if (!req.json) {
      req.json = async () => {
        const data = await req.text();
        return JSON.parse(data);
      };
    }

    const data = await req.json();
    const validation = zod.safeParse(data);

    if (!validation.success) {
      return NextResponse.json(getErrorResponse(validation.error), { status: 400 });
    }

    return next(req, {
      ...ctx,
      data: validation.data
    });
  };
};
