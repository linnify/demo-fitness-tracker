'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		repeatPassword: '',
	});

	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((previousData) => ({
			...previousData,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="w-full">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
						First Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="firstName"
						placeholder="First Name"
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
						Last Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="lastName"
						placeholder="Last Name"
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						placeholder="Email"
						type="text"
						name="email"
						value={formData.email}
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
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
						Repeat Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="repeatPassword"
						placeholder="Repeat Password"
						type="password"
						name="repeatPassword"
						value={formData.repeatPassword}
						onChange={handleChange}
					/>
				</div>
				<div className="flex space-x-4 items-center justify-between">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded foxus:outline-none focus:shadow-outline" type="submit">
						Sign Up
					</button>
					<a className="bg-white hover:bg-blue-50 border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/login">
						Sign In
					</a>
				</div>
			</form>
		</div>
	)
}

export default RegisterForm;
