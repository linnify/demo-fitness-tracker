import 'server-only';

import { UserProfile } from '@app/types/user.type';
import { db } from '@app/lib/db';

export const setDefaultAddress = async (id: number, address: string): Promise<void> => {
  await db.user.update({
    where: {
      id
    },
    data: {
      defaultDeliveryAddress: address
    }
  });
};

export const getUserProfile = (id: number): Promise<UserProfile | null> => {
  return db.user.findUnique({
    where: {
      id
    },
    include: {
      profile: {
        include: {
          allergens: true
        }
      }
    }
  });
};
