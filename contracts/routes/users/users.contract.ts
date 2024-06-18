import { requestInfoSchema, userSchema } from '@schemas';
import z from 'zod';

export interface GetUsersRequest {
  params: {
    id: string;
  };
}

export const getUsersResponseSchema = z.object({
  info: requestInfoSchema,
  results: z.array(userSchema),
});

export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
