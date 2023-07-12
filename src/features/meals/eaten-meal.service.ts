import { db } from '@app/lib/db';
import { AddMealData } from '@app/lib/meals/validation';
import { Meal } from '@prisma/client';
import { UserMeal } from '@app/types/user.type';

export const addMeal = async (
  userData: AddMealData,
  userId: number
): Promise<{ id: number; value: number; meal: Meal }> => {
  return db.eatenMeal.create({
    data: {
      value: userData.value,
      userId: userId,
      mealId: userData.mealId
    },
    include: {
      meal: true
    }
  });
};

export const getMeals = async (userId: number): Promise<UserMeal[]> => {
  return db.eatenMeal.findMany({
    where: {
      userId: userId
    },
    include: {
      meal: true
    }
  });
};
