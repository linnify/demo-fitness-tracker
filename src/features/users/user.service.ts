import { EmailSignUpData } from '@app/lib/auth/validation';
import { db } from '@app/lib/db';
import { getHashedPassword } from '@app/features/users/encryption.helper';
import { UserLifestyle } from '@prisma/client';

export const singUp = async (
  user: EmailSignUpData
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
          lifestyle: UserLifestyle.SEDENTARY
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
