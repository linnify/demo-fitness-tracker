'use client';

import * as React from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { appErrorMap } from '@app/lib/zod';
import { Toaster } from '@app/components/core/toaster';

type Props = {
  children?: React.ReactNode;
};

z.setErrorMap(appErrorMap);

export const AppProviders = ({ children }: Props) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 2
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};
