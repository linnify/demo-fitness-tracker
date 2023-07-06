import 'server-only';

import { hashToken } from '@app/lib/auth/utils';
import { randomBytes } from 'crypto';
import { db } from '@app/lib/db';
import envConfig from '@app/config/env.config';
import { UserVerificationToken } from '@prisma/client';
import { UserProfile } from '@app/../../../../types/user.type';

/**
 * Delete the verification token
 */
export const getVerificationToken = async (
  email: string,
  token: string
): Promise<UserVerificationToken | null> => {
  try {
    return db.userVerificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token: token
        }
      }
    });
  } catch (error) {
    return null;
  }
};

export const removeVerificationToken = async (email: string, token: string): Promise<void> => {
  await db.userVerificationToken.delete({
    where: {
      identifier_token: {
        identifier: email,
        token: token
      }
    }
  });
};

const createVerificationToken = async (email: string, token: string, expires: Date) => {
  await db.userVerificationToken.create({
    data: {
      identifier: email,
      token,
      expires
    }
  });
};

const sendVerificationEmail = async (email: string, url: string) => {
  const apiUrl = `${envConfig.host}/api/auth/emails/signup`;
  const body = {
    to: email,
    url
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Mail cannot be sent');
  }
};

export const emailSignIn = async (email: string, callbackUrl = '/') => {
  const ONE_DAY_IN_SECONDS = 86400;

  const dbUser = await db.user.findUnique({
    where: {
      email
    }
  });

  if (!dbUser) {
    // Only users in our system can log in
    throw new Error('Email-ul curent nu exista in sistem.');
  }
};

export const emailSignInCallback = async (email: string): Promise<UserProfile> => {
  let user = await db.user.findUnique({
    where: { email },
    include: {
      profile: {
        include: {
          allergens: true
        }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.emailVerified) {
    // TODO Save the last login
    return user;
  }

  return db.user.update({
    where: {
      id: user.id
    },
    data: {
      emailVerified: new Date()
    },
    include: {
      profile: {
        include: {
          allergens: true
        }
      }
    }
  });
};
