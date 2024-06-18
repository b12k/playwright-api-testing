import pactum from 'pactum';

import { env as environment } from '../env';

const zodSchemaAdapter: pactum.settings.JsonSchemaAdapter = {
  validate: (zodObject: Zod.ZodObject<Zod.ZodRawShape>, json: JSON) => {
    const parseResult = zodObject.safeParse(json);
    if (!parseResult.success) {
      const missmatches = Object.fromEntries(
        parseResult.error.issues.map(({ message, path }) => [
          path.join('.'),
          message,
        ]),
      );
      return `💩\n${JSON.stringify(missmatches, undefined, 2)}`;
    }

    return;
  },
};

pactum.settings.setJsonSchemaAdapter(zodSchemaAdapter);
pactum.settings.setLogLevel(environment.LOG_LEVEL as pactum.settings.LogLevel);
