import { createSpec } from '@lib';
import { test } from '@playwright/test';

import { type GetUserRequest } from './user.contract';

test.describe('CRUD /users', () => {
  test('Should not get user by id', async () => {
    await createSpec<GetUserRequest>({
      method: 'GET',
      path: '/api/{id}',
      request: {
        params: {
          id: 123,
        },
      },
    }).expectStatus(404);
  });
});
