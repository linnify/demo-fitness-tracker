'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@app/components/core/form';
import { Button } from '@app/components/core/button';
import {
  InputFormField,
  InputNumberFormField,
  PasswordFormField
} from '@app/components/form/input.control';
import { RegisterData, registerSchema } from '@app/lib/auth/validation';
import { useRouter } from 'next/navigation';
import ProfileRadioGroup, {
  ProfileRadioGroupValue
} from '@app/components/form/profile-radio-group';
import { UserLifestyle } from '@prisma/client';

const lifestyleTitle: Record<UserLifestyle, string> = {
  [UserLifestyle.SEDENTARY]: 'Sedentary',
  [UserLifestyle.ACTIVE_LOW]: 'Low Activity',
  [UserLifestyle.ACTIVE]: 'Active',
  [UserLifestyle.ACTIVE_HIGH]: 'High Activity'
};

const lifestyleDescription: Record<UserLifestyle, string> = {
  [UserLifestyle.SEDENTARY]: 'Not much of a workout person',
  [UserLifestyle.ACTIVE_LOW]: '1-3 days of working out',
  [UserLifestyle.ACTIVE]: '3-5 days of working out',
  [UserLifestyle.ACTIVE_HIGH]: 'Almost everyday of working out'
};

const lifeStyleOptions: ProfileRadioGroupValue[] = Object.values(UserLifestyle).map((value) => ({
  value,
  label: lifestyleTitle[value],
  description: lifestyleDescription[value]
}));

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterData) => {
    setLoading(true);

    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    setLoading(false);

    if (!response?.ok) {
      console.log('error');
      return;
    }

    router.push('/calories');
  };

  return (
    <Form {...form}>
      <form
        className="mb-4 flex flex-col gap-y-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <InputFormField
          control={form.control}
          name={'firstName'}
          label={'First Name'}
          className={'max-w-sm'}
        />
        <InputFormField
          control={form.control}
          name={'lastName'}
          label={'Last Name'}
          className={'max-w-sm'}
        />
        <InputFormField
          control={form.control}
          name={'email'}
          label={'Email'}
          className={'max-w-sm'}
        />
        <PasswordFormField
          control={form.control}
          name={'password'}
          label={'Password'}
          className={'max-w-sm'}
        />
        <InputNumberFormField
          control={form.control}
          name={'weight'}
          label={'Weight'}
          className={'max-w-sm'}
        />
        <InputNumberFormField
          control={form.control}
          name={'height'}
          label={'Height'}
          className={'max-w-sm'}
        />
        <ProfileRadioGroup
          values={lifeStyleOptions}
          control={form.control}
          name={'lifestyle'}
          label={'What type of lifestyle do you have?'}
        />

        <Button
          type="submit"
          disabled={loading}
          className="foxus:outline-none focus:shadow-outline mb-2 mt-4 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
        >
          Sign Up
        </Button>
        <div className="flex justify-center">
          <a className="text-blue-500 focus:outline-none" href="/auth/login">
            You have an account?
          </a>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
