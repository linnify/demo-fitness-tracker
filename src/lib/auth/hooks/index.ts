'use client';

import { useRouter } from 'next/navigation';
import { getSession, signIn, signOut } from '@app/lib/auth/client';
import { useState } from 'react';
import { EmailSignInOptions } from '@app/lib/auth/client/types';
import { useQuery } from '@tanstack/react-query';

const AUTH_SESSION_KEY = ['auth.session'];

/**
 * Load the current user using the react-tanstack library.
 */
export const useSession = <T>() => {
  return useQuery<T>(AUTH_SESSION_KEY, getSession, {
    staleTime: Infinity,
    cacheTime: Infinity
  });
};

export const useSignIn = (params: {
  onError: (message: string) => void;
  onSuccess: (email: string) => void;
}) => {
  const { onError, onSuccess } = params;
  const [loading, setLoading] = useState<boolean>();

  const onSignIn = async (email: string, options?: EmailSignInOptions) => {
    setLoading(true);
    const signInResult = await signIn(email, options);
    setLoading(false);

    if (!signInResult.ok) {
      return onError(signInResult.error ?? '');
    }

    onSuccess(email);
  };
  return {
    loading,
    onSignIn
  };
};

export const useSignOut = (authPath: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogout = async () => {
    setIsLoading(true);
    await signOut();
    router.replace(authPath);
    setIsLoading(false);
  };

  return {
    onLogout,
    isLoading
  };
};
