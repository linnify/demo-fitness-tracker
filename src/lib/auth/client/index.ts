'use client';

import {
  EmailSignInOptions,
  EmailSignInResponse,
  SignOutOptions
} from '@app/lib/auth/client/types';

export const signIn = async (
  email: string,
  options?: EmailSignInOptions
): Promise<EmailSignInResponse> => {
  if (!email) {
    return {
      ok: false,
      error: 'Invalid email'
    };
  }

  const url = '/api/auth/signin/email';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.toLowerCase(),
      callbackUrl: options?.callbackUrl
    })
  });

  const data = await response.json();
  const emailResponse: EmailSignInResponse = {
    ok: response.ok
  };

  if (!emailResponse.ok) {
    emailResponse.error = data.message;
  }

  return emailResponse;
};

export const signOut = async (options?: SignOutOptions): Promise<void> => {
  const url = '/api/auth/signout';
  const res = await fetch(url, { method: 'POST' });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message);
  }
};

export const getSession = async <T>(): Promise<T> => {
  const url = '/api/auth/session';
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? 'Invalid authentication token');
  }

  return data as T;
};
