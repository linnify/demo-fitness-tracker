import React from 'react';
import { HomeNav } from '@app/app/calories/components/home-nav';
import { HomeNavNoAuth } from '@app/app/auth/components/home-nav-no-auth';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col space-y-6 bg-home-background bg-cover bg-no-repeat">
      <header className="sticky top-0 z-40 border-b bg-background">
        <HomeNavNoAuth className="container flex items-center justify-between gap-6 px-8 py-2" />
      </header>
      <main className="container flex h-full w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
