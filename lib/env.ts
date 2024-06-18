import z from 'zod';

const urls = z.object({
  BASE_GQL_URL: z.string().url().optional().or(z.literal('')),
  BASE_REST_URL: z.string().url().optional().or(z.literal('')),
  BASE_URL: z.string().url().optional().or(z.literal('')),
});

urls
  .refine(
    ({ BASE_GQL_URL, BASE_REST_URL, BASE_URL }) =>
      BASE_URL || BASE_GQL_URL || BASE_REST_URL,
    'No URLs provided',
  )
  .parse(process.env);

const envSchema = urls.extend({
  LOG_LEVEL: z
    .enum(['VERBOSE', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'SILENT'])
    .optional()
    .default('INFO'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
