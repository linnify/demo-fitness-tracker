'use server';

import { redirect } from 'next/navigation';
import { UserService } from '@app/services/user-service';

export async function login(data: FormData) {
  const username = data.get('username');
  const password = data.get('password');

  if (username === null || password === null) {
    return;
  }

  const userService = new UserService();
  const authenticated = await userService.verifyCredentials(
    username.toString(),
    password.toString()
  );

  if (authenticated) {
    redirect('/');
  }
}
