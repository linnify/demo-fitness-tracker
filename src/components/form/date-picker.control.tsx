'use client';

import * as React from 'react';

import { cn } from '@app/lib/utils';

import {
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormItem,
  FormLabel
} from '@app/components/core/form';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@app/components/core/date-picker';

const DatePickerFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  className,
  datePickerProps,
  ...props
}: {
  label?: string;
  description?: string;
  datePickerProps?: Omit<DatePickerProps, 'onSelect'>;
  className?: string;
} & Omit<ControllerProps<TFieldValues, TName>, 'render'>) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue}
      rules={props.rules}
      shouldUnregister={props.shouldUnregister}
      render={({ field }) => (
        <FormItem className={cn(className)} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <DatePicker
              value={field.value}
              onSelect={field.onChange}
              {...datePickerProps}
            ></DatePicker>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </FormItem>
      )}
    />
  );
};

DatePickerFormField.displayName = 'DatePickerFormField';

// TODO Export DateRangePickerFormField
export { DatePickerFormField };
