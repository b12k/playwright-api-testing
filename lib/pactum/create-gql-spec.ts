import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pactum from 'pactum';
import StackTracey from 'stacktracey';

import { env } from '../env';
import { isGqlFilePath } from './is-gql-file-path';

type PactumSpec = ReturnType<typeof pactum.spec>;
type UrlString = `http://${string}` | `https://${string}`;
type SpecCreatorConfigOptions = {
  baseUrl: UrlString;
};
type SpecCreatorConfig<T> = {
  options?: SpecCreatorConfigOptions;
  query?: string;
  variables?: T;
};

const defaultCreatorConfigOptions: SpecCreatorConfigOptions = {
  baseUrl: (env.BASE_GQL_URL || env.BASE_URL) as UrlString,
};

export const createGqlSpec = <T>(config: SpecCreatorConfig<T>): PactumSpec => {
  const { options, query: queryStringOrQueryPath = '', variables } = config;
  const stack = new StackTracey();
  const callerFileName = fileURLToPath(stack.items[1].file);
  const callerDirName = path.dirname(callerFileName);

  let queryString = queryStringOrQueryPath;
  let queryPaths: Array<string> = [];

  if (!queryStringOrQueryPath) {
    queryPaths = [
      callerFileName.replace('.test.ts', '.query.gql'),
      callerFileName.replace('.test.ts', '.query.graphql'),
    ];
  } else if (isGqlFilePath(queryStringOrQueryPath)) {
    queryPaths = [path.resolve(callerDirName, queryStringOrQueryPath)];
  } else {
    queryString = queryStringOrQueryPath;
  }

  if (queryPaths.length > 0) {
    for (const path of queryPaths) {
      try {
        queryString = readFileSync(path, 'utf8');
        break;
        // eslint-disable-next-line no-empty
      } catch {}
    }
  }

  if (!queryString) {
    console.error(`⚠️ Missing graphql query:
EITHER
  - Not explicitly provided
OR
${queryPaths.map((path) => `  - Missing ${path}`).join('\nOR\n')}`);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }

  const { baseUrl } = {
    ...defaultCreatorConfigOptions,
    ...options,
  };

  const pactumSpec = pactum.spec();

  pactumSpec.post(baseUrl).withGraphQLQuery(queryString);

  if (variables) pactumSpec.withGraphQLVariables(variables);

  return pactumSpec;
};
