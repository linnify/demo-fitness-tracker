import 'server-only';

import { redirect } from 'next/navigation';
import { getServerSession } from '@app/lib/auth/session';
import { SessionUser } from '@app/lib/session/types';

/**
 * Return the current user by decoding the auth session cookie
 * Does NOT call the Database.
 *
 * If the user is not found a redirect is performed to auth page
 */
// export async function getUserSession(): Promise<SessionUser> {
//   const session = await getServerSession();
//   const user = session?.user;
//
//   if (!user) {
//     return redirect('/auth');
//   }
//
//   return user;
// }

// export async function getCurrentUser(): Promise<UserProfile> {
//   const session = await getUserSession();
//   const user =  "N"
//   if (!user) {
//     return redirect('/auth/session-expired');
//   }
//
//   return user;
// }
