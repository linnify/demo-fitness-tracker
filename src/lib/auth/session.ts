import { cookies } from 'next/headers';
import { verify } from '@app/lib/auth/jwt';
import { Session } from '@app/lib/session/types';
import { AUTH_COOKIE } from '@app/lib/auth/cookies';

/**
 * Return the current user by decoding the auth session cookie
 * Does NOT call the Database.
 *
 * TODO If the session expired, set a new session in the cookie
 */
export const getServerSession = async (): Promise<Session | null> => {
  const token = cookies().get(AUTH_COOKIE);

  if (!token) {
    return null;
  }

  const jwtPayload = await verify(token.value);

  if (!jwtPayload) {
    return null;
  }

  return {
    user: {
      email: jwtPayload.email,
      id: jwtPayload.id,
      onboarded: jwtPayload.onboarded
    },
    exp: jwtPayload.exp
  };
};
