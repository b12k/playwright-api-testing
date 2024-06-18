import z from 'zod';

export const requestInfoSchema = z.object({
  page: z.number(),
  results: z.number(),
  seed: z.string().optional(),
  version: z.string(),
});

export type RequestInfo = z.infer<typeof requestInfoSchema>;
