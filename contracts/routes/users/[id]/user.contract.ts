import z from 'zod';

export interface GetUserRequest {
  params: {
    id: number;
  };
}

export const getUserResponseSchema = z.string();

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
