import {
  RadioGroupFormField,
  RadioGroupFormFieldProps
} from '@app/components/form/radio-group.control';
import { FormControl, FormItem, FormLabel } from '@app/components/core/form';
import { RadioGroupItem } from '@app/components/core/radio-group';
import React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@app/lib/utils';

export type ProfileRadioGroupValue = {
  value: string;
  label: string;
  description?: string;
};

export type ProfileRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  values: ProfileRadioGroupValue[];
  label: string;
  classNameValue?: string;
} & Omit<
  RadioGroupFormFieldProps<TFieldValues, TName>,
  'values' | 'render' | 'renderValue' | 'renderLabel'
>;

const RadioGroupValue = ({
  value,
  className
}: {
  value: ProfileRadioGroupValue;
  className?: string;
}) => {
  return (
    <FormItem
      className={cn('flex items-start gap-3 space-y-0 rounded bg-gray-100 px-4', className)}
      key={value.value}
    >
      <FormControl>
        <RadioGroupItem value={value.value} className={'mt-4'} />
      </FormControl>
      <FormLabel className="w-full cursor-pointer py-4 font-semibold text-primary">
        {value.label}
        {value.description && <div className={'mt-2 text-xs font-normal'}>{value.description}</div>}
      </FormLabel>
    </FormItem>
  );
};

const ProfileRadioGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  values,
  label,
  classNameRadioGroup,
  className,
  classNameValue,
  ...props
}: ProfileRadioGroupProps<TFieldValues, TName>) => {
  return (
    <RadioGroupFormField
      className={cn('flex w-full flex-col gap-2 md:w-fit', className)}
      classNameRadioGroup={cn(
        'p-4 gap-4  flex flex-col md:flex-row justify-between',
        classNameRadioGroup
      )}
      control={props.control}
      values={values}
      renderLabel={() => (
        <div className={'ml-3 text-sm font-semibold text-primary-darker'}>{label}</div>
      )}
      renderValue={(value: ProfileRadioGroupValue) => (
        <RadioGroupValue key={value.value} value={value} className={classNameValue} />
      )}
      {...props}
    />
  );
};

export default ProfileRadioGroup;
