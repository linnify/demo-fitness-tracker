import { Alert, AlertDescription, AlertTitle } from '@app/components/core/alert';
import { Icons } from '@app/components/icons';
import React from 'react';
import { cn } from '@app/lib/utils';

type InfoProps = {
  title: string;
  details: string;
  className?: String;
};

export default function Info({ title, details, className }: InfoProps) {
  return (
    <Alert variant={'success'} className={cn('w-full rounded-xl p-4', className)}>
      <AlertTitle className={'flex items-center gap-2'}>
        <Icons.info className="h-4 w-4" />
        {title}
      </AlertTitle>
      <AlertDescription>{details}</AlertDescription>
    </Alert>
  );
}
