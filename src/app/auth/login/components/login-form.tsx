'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginData, loginSchema } from '@app/lib/auth/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@app/components/core/form';
import { InputFormField, PasswordFormField } from '@app/components/form/input.control';
import { Button } from '@app/components/core/button';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);

    const response = await fetch(`/api/auth/login`, {
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

        <Button
          type="submit"
          disabled={loading}
          className="foxus:outline-none focus:shadow-outline mb-2 mt-4 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
        >
          Sign Up
        </Button>
        <div className="flex justify-center">
          <a className="text-blue-500 focus:outline-none" href="/auth/register">
            You do not have an account?
          </a>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
