'use client';

import React from 'react';
import Link from 'next/link';

import { cn } from '@app/lib/utils';
import { Icons } from '@app/components/icons';
import { Button } from '@app/components/core/button';
import { useSignOut } from '@app/lib/auth/hooks';

export function HomeNavNoAuth({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex h-full w-full justify-between gap-6 bg-stone-300 md:gap-10', className)}
    >
      <img src={'/images/fitness-tracker-logo.png'} className={'h-20 w-20 rounded-md'} />
    </div>
  );
}
