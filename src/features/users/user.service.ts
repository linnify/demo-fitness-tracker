import { LoginData, RegisterData } from '@app/lib/auth/validation';
import { db } from '@app/lib/db';
import bcrypt from 'bcryptjs';
import { SessionUser } from '@app/lib/session/types';
import { getServerSession } from '@app/lib/auth/session';
import { redirect } from 'next/navigation';

export const getHashedPassword = (password: string): string => {
  const salt: string = bcrypt.genSaltSync();

  return bcrypt.hashSync(password, salt);
};
export async function getUserSession(): Promise<SessionUser> {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return redirect('/auth');
  }

  return user;
}
export const login = async (
  userData: LoginData
): Promise<{ id: number; email: string; firstName: string; lastName: string }> => {
  const user = await db.user.findUnique({
    where: {
      email: userData.email
    }
  });

  if (!user || !bcrypt.compareSync(userData.password, user.password)) {
    throw Error('User not found');
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
};

export const singUp = async (
  user: RegisterData
): Promise<{ id: number; email: string; firstName: string; lastName: string }> => {
  return await db.user.create({
    data: {
      email: user.email,
      password: getHashedPassword(user.password),
      firstName: user.firstName,
      lastName: user.lastName,
      personalDetails: {
        create: {
          height: user.height,
          weight: user.weight,
          lifestyle: user.lifestyle
        }
      }
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true
    }
  });
};
