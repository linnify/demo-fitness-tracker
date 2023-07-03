'use server';

import { redirect } from 'next/navigation';
import { UserService } from '../../services/user-service';

export async function register(data: FormData) {
	const firstName = data.get('firstName');
	const lastName = data.get('lastName');
	const email = data.get('email');
	const password = data.get('password');
	const repeatPassword = data.get('repeatPassword');

	if (firstName == null || lastName == null || email == null || password == null || repeatPassword == null) {
		return;
	}

	if (password.toString() !== repeatPassword.toString()) {
		return;
	}

	const userService = new UserService()
	try {
		await userService.createUser(firstName.toString(), lastName.toString(), email.toString(), password.toString());
		redirect('/');
	} catch (e) {
		console.log(`${e}`);
		return;
	}
}
