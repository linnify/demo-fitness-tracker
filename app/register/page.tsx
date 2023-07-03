import RegisterForm from './register-form';

export default function Register() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10">
				<RegisterForm />
			</div>
		</main>
	)
}
