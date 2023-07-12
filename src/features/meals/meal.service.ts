import { db } from '@app/lib/db';
import { Meal } from '@prisma/client';

export const getMeals = async (): Promise<Meal[]> => {
  return db.meal.findMany();
};
