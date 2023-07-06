'use client';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormError,
  FormField
} from '@app/components/core/form';
import { Input } from '@app/components/core/input';
import React from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@app/lib/utils';
import { PasswordInput } from '@app/components/core/password';

const InputFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  placeholder,
  ...props
}: {
  label?: string;
  description?: string;
  placeholder?: string;
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
        <FormItem className={cn(props.className)} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </FormItem>
      )}
    />
  );
};

const PasswordFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  placeholder,
  ...props
}: {
  label?: string;
  description?: string;
  placeholder?: string;
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
        <FormItem className={cn(props.className)} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <PasswordInput placeholder={placeholder} {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </FormItem>
      )}
    />
  );
};

const InputNumberFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  placeholder,
  ...props
}: {
  label?: string;
  description?: string;
  placeholder?: string;
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
        <FormItem className={cn(props.className)} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={'number'}
              placeholder={placeholder}
              {...field}
              {...props.control?.register(props.name, { valueAsNumber: true })}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </FormItem>
      )}
    />
  );
};

InputFormField.displayName = 'InputFormField';
PasswordFormField.displayName = 'PasswordFormField';
InputNumberFormField.displayName = 'InputNumberFormField';

export { InputFormField, PasswordFormField, InputNumberFormField };
