import { Button } from '@app/components/core/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-4">
      <h2 className={' mb-2 text-4xl font-bold text-gray-700'}>Fitness Tracker</h2>
      <div>
        <Button
          asChild
          variant={'outline'}
          className="foxus:outline-none focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          <Link href={'/auth/login'}>Login</Link>
        </Button>
        <Button
          asChild
          variant={'outline'}
          className="foxus:outline-none focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          <Link href={'/auth/register'}>Register</Link>
        </Button>
      </div>
    </main>
  );
}
