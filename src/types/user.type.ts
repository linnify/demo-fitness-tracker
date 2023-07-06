import {
  User as PrismaUser,
  PersonalDetails as PrismaPersonalDetails,
  UserLifestyle
} from '@prisma/client';

export type User = PrismaUser & {};

export type UserProfile = PrismaUser & {
  profile: PrismaPersonalDetails | null;
};
