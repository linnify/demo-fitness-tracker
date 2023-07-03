import LoginForm from './login-form';

export default function Login() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10">
				<LoginForm />
			</div>
		</main>
	)
}
