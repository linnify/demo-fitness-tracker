import * as z from 'zod';

export const emailSignUpSchema = z.object({
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  height: z.number(),
  weight: z.number(),
  callbackUrl: z.string().optional()
});

export type EmailSignUpData = z.infer<typeof emailSignUpSchema>;
