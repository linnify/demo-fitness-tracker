import { NextResponse } from 'next/server';
import { getServerSession } from '@app/lib/auth/session';
import { getUserProfile } from '@app/features/users/user.repository';

/**
 * Endpoint used to return the user session details
 */
export const GET = async () => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
  }

  const user = await getUserProfile(session.user.id);

  return NextResponse.json(user);
};
