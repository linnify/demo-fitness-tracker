import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormItem,
  FormLabel
} from '@app/components/core/form';
import { cn } from '@app/lib/utils';
import React from 'react';
import { Switch } from '@app/components/core/switch';

const SwitchFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  className,
  ...props
}: {
  label?: string;
  description?: string;
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
        <FormItem className={cn('flex flex-col', className)} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </FormItem>
      )}
    />
  );
};

SwitchFormField.displayName = 'SwitchFormField';

export { SwitchFormField };
