import { createSpec } from '@lib';
import { test } from '@playwright/test';

import { type GetUsersRequest, getUsersResponseSchema } from './users.contract';

test.describe('/users', () => {
  test('Get all', async () => {
    await createSpec<GetUsersRequest>({
      method: 'GET',
      path: '/api',
    })
      .expectStatus(200)
      .expectJsonSchema(getUsersResponseSchema);
  });
});
