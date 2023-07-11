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
