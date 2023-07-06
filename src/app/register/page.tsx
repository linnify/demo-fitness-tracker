'use client';

import RegisterForm from './components/register-form';

export default function Register() {
  return (
    <div className="z-10 flex min-h-screen w-full flex-col items-center justify-between p-24">
      <RegisterForm />
    </div>
  );
}
