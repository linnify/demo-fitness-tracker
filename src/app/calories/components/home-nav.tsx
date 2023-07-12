'use client';

import React from 'react';
import Link from 'next/link';

import { cn } from '@app/lib/utils';
import { Icons } from '@app/components/icons';
import { Button } from '@app/components/core/button';
import { useSignOut } from '@app/lib/auth/hooks';

export function HomeNav({ className }: { className?: string }) {
  const { onLogout, isLoading } = useSignOut('/auth/login');

  return (
    <div className={cn('flex h-full w-full justify-between gap-6 md:gap-10', className)}>
      <img src={'/images/fitness-tracker-logo.png'} className={'h-20 w-20 rounded-md'} />
      <nav className="gap-6 md:flex">
        <Button
          disabled={isLoading}
          variant={'outline'}
          className="foxus:outline-none focus:shadow-outline mb-2 mt-4 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
          onClick={onLogout}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Log out
        </Button>
      </nav>
    </div>
  );
}
