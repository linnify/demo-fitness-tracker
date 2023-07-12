import * as z from 'zod';
import { UserLifestyle } from '@prisma/client';

export const addMealSchema = z.object({
  value: z.number().positive(),
  mealId: z.number().int().positive()
});

export type AddMealData = z.infer<typeof addMealSchema>;
