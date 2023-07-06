import { RequestCookies, ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';

const DEFAULT_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const AUTH_COOKIE = 'auth.session';

export const getAuthCookie = (cookies: RequestCookies): string | null => {
  const cookie = cookies.get(AUTH_COOKIE);
  return cookie?.value ?? null;
};

export const setResponseAuthCookie = (response: NextResponse, token: string): NextResponse => {
  const cookie = authCookieOptions(token, response.url);
  response.cookies.set(cookie);

  return response;
};

export const cleanAuthCookie = (cookies: { delete: (value: string) => void }) => {
  cookies.delete(AUTH_COOKIE);
};

const authCookieOptions = (
  value: string,
  url: string,
  maxAge = DEFAULT_SESSION_MAX_AGE
): ResponseCookie => {
  return {
    name: AUTH_COOKIE,
    value,
    httpOnly: true,
    sameSite: 'lax', // Do not change to Strict, since it's not working if the user is coming to another site
    path: '/',
    secure: url.startsWith('https://'),
    maxAge
  };
};
