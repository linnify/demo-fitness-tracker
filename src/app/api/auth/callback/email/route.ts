import { NextRequest, NextResponse } from 'next/server';
import { hashToken } from '@app/lib/auth/utils';
import {
  emailSignInCallback,
  getVerificationToken,
  removeVerificationToken
} from '@app/lib/auth/providers/email';
import { encodeUser } from '@app/lib/auth/jwt';
import { setResponseAuthCookie } from '@app/lib/auth/cookies';
import envConfig from '@app/config/env.config';

/**
 * Get the token, email and the callbackUrl from query params.
 *
 * If the token or email is invalid or not exist, the user is redirect to auth page
 * If the token and email is valid, we update the current user and set the auth session cookie
 */
export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams;

  const rawToken = query.get('token');
  const email = query.get('email');
  const callbackUrl = query.get('callbackUrl') ?? '/';
  const errorPath = '/auth/error';
  const currentDate = Date.now();

  if (!rawToken || !email) {
    const errorUrl = `${errorPath}?message=${encodeURIComponent(
      'Invalid email or token. Please try again to login'
    )}`;
    return NextResponse.redirect(new URL(errorUrl, req.url));
  }

  const hashedToken = hashToken(rawToken);
  const verificationToken = await getVerificationToken(email, hashedToken);

  if (!verificationToken || verificationToken.expires.getTime() < currentDate) {
    const errorUrl = `${errorPath}?message=${encodeURIComponent(
      'Link este invalid, expirat sau a fost deja folosit.'
    )}`;
    return NextResponse.redirect(new URL(errorUrl, envConfig.host));
  }

  const user = await emailSignInCallback(email);

  const jwtToken = await encodeUser(user);

  await removeVerificationToken(email, hashedToken);

  const redirectUrl = !!user.profile?.completedAt ? callbackUrl : '/profile';
  const response = NextResponse.redirect(new URL(redirectUrl, envConfig.host));

  return setResponseAuthCookie(response, jwtToken);
};
