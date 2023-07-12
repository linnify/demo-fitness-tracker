import {
  User as PrismaUser,
  PersonalDetails as PrismaPersonalDetails,
  UserLifestyle,
  Meal
} from '@prisma/client';

export type User = PrismaUser & {};

export type UserProfile = PrismaUser & {
  profile: PrismaPersonalDetails | null;
};

export type Nutrients = {
  calories: number;
  fats: number;
  carbohydrates: number;
  proteins: number;
};

export type Totals = {
  consumed: Nutrients;
  indicated: Nutrients;
};

export type UserMeal = {
  id: number;
  value: number;
  meal: Meal;
};
