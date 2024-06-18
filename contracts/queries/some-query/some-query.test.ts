import { createGqlSpec } from '@lib';
import { test } from '@playwright/test';

import {
  type SomeQueryVariables,
  someQueryResponseSchema,
} from './some-query.contract';

test.describe('Rick & Morty', () => {
  const spec = createGqlSpec<SomeQueryVariables>({
    variables: {
      filter: {
        name: 'Rick',
      },
      page: 1,
    },
  });
  test('should do something', async () => {
    await spec.expectStatus(200).expectJsonSchema(someQueryResponseSchema);
  });
});
