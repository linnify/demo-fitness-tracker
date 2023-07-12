import { NextRequest, NextResponse } from 'next/server';
import { getMeals } from '@app/features/meals/meal.service';

const getMealsHandler = async (req: NextRequest) => {
  try {
    const meal = await getMeals();

    return NextResponse.json(meal, { status: 200 });
  } catch (e) {
    const message = (e as Error).message ?? 'Error';
    return NextResponse.json({ message }, { status: 400 });
  }
};

export const GET = getMealsHandler;
