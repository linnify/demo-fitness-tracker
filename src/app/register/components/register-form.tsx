'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@app/components/core/form';
import { Button } from '@app/components/core/button';
import { InputFormField, InputNumberFormField } from '@app/components/form/input.control';
import { EmailSignUpData, emailSignUpSchema } from '@app/lib/auth/validation';

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<EmailSignUpData>({
    resolver: zodResolver(emailSignUpSchema)
  });

  const onSubmit = async (data: EmailSignUpData) => {
    setLoading(true);

    const response = await fetch(`/api/auth/sign-in`, {
      method: 'POST',
      body: JSON.stringify({ ...data, callbackUrl: '/calories' })
    });
    setLoading(false);

    if (!response?.ok) {
      console.log('error');
      // return toast({
      //     title,
      //     description: 'Your name was not updated. Please try again.',
      //     variant: 'destructive'
      //   });
    }
    console.log('success');
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
        <InputFormField
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

        <Button
          type="submit"
          disabled={loading}
          className="foxus:outline-none focus:shadow-outline mb-2 mt-4 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
        >
          Sign Up
        </Button>
        <div className="flex justify-center">
          <a className="text-blue-500 focus:outline-none" href="/login">
            You have an account?
          </a>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
