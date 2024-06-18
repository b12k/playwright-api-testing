import z from 'zod';

export const userSchema = z.object({
  gender: z.enum(['female', 'male']),
  name: z.object({
    first: z.string(),
    last: z.string(),
    title: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;
