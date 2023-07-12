import { NextRequest, NextResponse } from 'next/server';
import { RequestDataContext, withValidation } from '@app/lib/validation';
import { AddMealData, addMealSchema } from '@app/lib/meals/validation';
import { addMeal, getMeals } from '@app/features/meals/eaten-meal.service';
import { getUserSession } from '@app/features/users/user.service';

const addMealHandler = async (req: NextRequest, context: RequestDataContext<AddMealData>) => {
  try {
    const mealData = context.data;
    const sessionUser = await getUserSession();
    const meal = await addMeal(mealData, sessionUser.id);

    return NextResponse.json(meal, { status: 201 });
  } catch (e) {
    const message = (e as Error).message ?? 'Error';
    return NextResponse.json({ message }, { status: 400 });
  }
};

const getMealsHandler = async (req: NextRequest) => {
  try {
    const sessionUser = await getUserSession();
    const meal = await getMeals(sessionUser.id);

    return NextResponse.json(meal, { status: 200 });
  } catch (e) {
    const message = (e as Error).message ?? 'Error';
    return NextResponse.json({ message }, { status: 400 });
  }
};

export const POST = withValidation(addMealSchema, addMealHandler);
export const GET = getMealsHandler;
