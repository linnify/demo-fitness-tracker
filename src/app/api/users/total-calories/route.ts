import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@app/features/users/user.service';
import { getMeals } from '@app/features/meals/eaten-meal.service';

export const GET = async (req: NextRequest) => {
  try {
    const sessionUser = await getUserSession();
    const meals = await getMeals(sessionUser.id);
    const totalConsumed = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.value * meal.meal.calories;
        acc.fats += meal.value * meal.meal.fats;
        acc.carbohydrates += meal.value * meal.meal.carbohydrates;
        acc.proteins += meal.value * meal.meal.proteins;

        return acc;
      },
      { calories: 0, fats: 0, carbohydrates: 0, proteins: 0 }
    );

    return NextResponse.json(
      {
        consumed: totalConsumed,
        indicated: { calories: 2300, fats: 10, carbohydrates: 20, proteins: 10 }
      },
      { status: 200 }
    );
  } catch (e) {
    const message = (e as Error).message ?? 'Error';
    return NextResponse.json({ message }, { status: 400 });
  }
};
