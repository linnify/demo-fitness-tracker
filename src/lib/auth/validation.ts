import * as z from 'zod';
import { UserLifestyle } from '@prisma/client';

export const registerSchema = z.object({
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  height: z.number(),
  weight: z.number(),
  lifestyle: z.nativeEnum(UserLifestyle)
});

export type RegisterData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  password: z.string()
});

export type LoginData = z.infer<typeof loginSchema>;
