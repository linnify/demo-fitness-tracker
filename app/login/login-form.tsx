'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


const LoginForm = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((previousData) => ({
			...previousData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
		router.push('/register');
	};

	return (
		<div className="w-full">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
						Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						placeholder="Username"
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						placeholder="Password"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<div className="flex space-x-4 items-center justify-between">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded foxus:outline-none focus:shadow-outline" type="submit">
						Sign In
					</button>
					<a className="bg-white hover:bg-blue-50 border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/register">
						Sign Up
					</a>
					<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
						Forgot Password?
					</a>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
