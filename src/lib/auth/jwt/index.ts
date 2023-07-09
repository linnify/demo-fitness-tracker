import { SessionPayload, SessionUser } from '@app/lib/session/types';
import * as jose from 'jose';
import { JWTExpireError } from '@app/lib/auth/jwt/types';
import envConfig from '@app/config/env.config';

const DEFAULT_MAX_AGE = 1000 * 30 * 24 * 60 * 60; // 30 days
const AUTH_TOKEN_AUDIENCE = envConfig.environment;
const AUTH_TOKEN_ISSUER = envConfig.auth.issuer;
const AUTH_SECRET = envConfig.auth.secret;

export const encodeUser = async (user: {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}): Promise<string> => {
  return encode({
    id: user.id,
    email: user.email
  });
};

/** Issues a JWT.*/
export async function encode(payload: SessionUser): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);

  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(DEFAULT_MAX_AGE)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .setAudience(AUTH_TOKEN_AUDIENCE)
    .setIssuer(AUTH_TOKEN_ISSUER)
    .sign(new TextEncoder().encode(AUTH_SECRET));
}

/**
 * Verify a JWT and return the payload
 * Throws an error if the token is Expired.
 **/
export async function verify(token: string): Promise<SessionPayload> {
  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(AUTH_SECRET), {
      audience: AUTH_TOKEN_AUDIENCE,
      issuer: AUTH_TOKEN_ISSUER
    });

    return payload as SessionPayload;
  } catch (e) {
    if (e instanceof jose.errors.JWTExpired) {
      throw new JWTExpireError();
    }

    throw e;
  }
}
