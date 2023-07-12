'use client';

import ProfileCaloriesHeader from '@app/app/calories/components/calories-card';
import { useEffect, useState } from 'react';
import { Totals, UserMeal } from '@app/types/user.type';
import MealTable from '@app/app/calories/components/meal-table';
import { Button } from '@app/components/core/button';
import AddMealDialog from '@app/app/calories/components/add-meal-dialog';

const Container = () => {
  const [isLoadingTotals, setIsLoadingTotals] = useState<boolean>(false);
  const [totals, setTotals] = useState<Totals>();

  const [isLoadingMeals, setIsLoadingMeals] = useState<boolean>(false);
  const [meals, setMeals] = useState<UserMeal[]>([]);

  useEffect(() => {
    getUserTotals();
    getUserMeals();
  }, []);

  useEffect(() => {
    getUserTotals();
  }, [meals]);

  const getUserTotals = async () => {
    setIsLoadingTotals(true);
    const response = await fetch(`/api/users/total-calories`, {
      method: 'GET'
    });
    setTotals(await response.json());
    setIsLoadingTotals(false);
  };
  const getUserMeals = async () => {
    setIsLoadingMeals(true);
    const response = await fetch(`/api/eaten-meals`, {
      method: 'GET'
    });
    setMeals(await response.json());
    setIsLoadingMeals(false);
  };

  const onAddMeal = (meal: UserMeal): void => {
    setMeals([...meals, meal]);
  };

  return (
    <>
      {!isLoadingTotals && !!totals && <ProfileCaloriesHeader totals={totals} />}
      <AddMealDialog onAddMeal={onAddMeal} />
      {!isLoadingMeals && meals.length > 0 && <MealTable meals={meals} />}
    </>
  );
};

export default Container;
