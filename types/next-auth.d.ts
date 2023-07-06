import { Account } from 'next-auth/src/core/types';

declare module 'types/next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: number;
      email: string;
      name?: string | null;
    };
  }

  interface User {
    id: number;
    email: string;
  }

  interface AdapterUser {
    id: number;
    email: string;
    name: string | null;
    emailVerified: Date | null;
  }

  interface AdapterAccount extends Account {
    userId: number;
    type: string;
    access_token: string | null;
    refresh_token: string | null;
    token_type: string | null;
    id_token: string | null;
    scope: string | null;
    expires_at: number | null;
    session_state: string | null;
  }

  interface AdapterSession {
    sessionToken: string;
    userId: number;
    expires: Date;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: number;
    email: string;
    name?: string | null;
  }
}
