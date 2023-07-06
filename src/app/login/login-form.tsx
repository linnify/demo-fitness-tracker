'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './actions';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/register');
  };

  return (
    <div className="w-full">
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md" action={login}>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <button
            className="foxus:outline-none focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="focus:shadow-outline rounded border border-blue-500 bg-white px-4 py-2 font-bold text-blue-500 hover:bg-blue-50 focus:outline-none"
            href="/register"
          >
            Sign Up
          </a>
          <a
            className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
            href="src/app/login#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
