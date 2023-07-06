import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '@app/components/core/dialog';
import { Button } from '@app/components/core/button';
import { cn } from '@app/lib/utils';

type InformationDialogProps = {
  title?: string;
  description?: string;
  image?: string;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function InformationDialog({
  title,
  description,
  image,
  onClose,
  children
}: InformationDialogProps) {
  return (
    <DialogContent
      className="flex h-full gap-0 overflow-y-auto border-none p-0 sm:max-h-[620px] sm:max-w-[630px]"
      portalClassName={'flex flex-col'}
      onClose={onClose}
    >
      <div
        className={cn(
          'hidden h-full w-[186px] min-w-[186px] rounded-l-lg bg-cover bg-no-repeat sm:block',
          image
        )}
      ></div>
      <div className={'flex flex-col justify-between pl-8 pr-8'}>
        <div className={'flex flex-col gap-8 pt-12 '}>
          <DialogHeader className={'pr-6'}>
            <h5>{title}</h5>
          </DialogHeader>
          {!!description && <DialogDescription>{description}</DialogDescription>}

          {children}
        </div>

        <DialogFooter className={'mt-4 pb-6 pr-6 sm:justify-start'}>
          <Button onClick={onClose} size={'lg'}>
            Am înțeles
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}
