import z from 'zod';

export type SomeQueryVariables = {
  filter: {
    name: string;
  };
  page: number;
};

export const someQueryResponseSchema = z.object({
  data: z.object({
    characters: z.object({
      info: z.object({
        count: z.number(),
      }),
      results: z.array(
        z.object({
          name: z.string(),
        }),
      ),
    }),
  }),
});

export type SomeQueryResponse = z.infer<typeof someQueryResponseSchema>;
