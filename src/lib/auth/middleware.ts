import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { verify } from '@app/lib/auth/jwt';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { SessionPayload } from '@app/lib/session/types';
import { AUTH_COOKIE, getAuthCookie } from '@app/lib/auth/cookies';

export interface NextRequestWithAuth extends NextRequest {
  auth?: SessionPayload | null;
}

export type NextMiddlewareWithAuth = (
  request: NextRequestWithAuth,
  event: NextFetchEvent
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export const withAuth = (middleware: NextMiddlewareWithAuth) => {
  return async (...args: Parameters<NextMiddlewareWithAuth>) => {
    const req = args[0];
    const cookies = req.cookies;
    const sessionExpired = req.nextUrl.pathname.startsWith('/auth/session-expired');
    const token = getAuthCookie(cookies) ?? req.headers.get('authorization');

    if (sessionExpired) {
      const response = NextResponse.redirect(new URL('/auth', req.url));
      response.cookies.delete(AUTH_COOKIE);
      return response;
    }

    if (!token) {
      return middleware(...args);
    }

    try {
      args[0].auth = await verify(token);
    } catch (e) {
      req.cookies.delete(AUTH_COOKIE);
    }

    return middleware(...args);
  };
};
