import pactum from 'pactum';

import { env } from '../env';

type PactumSpec = ReturnType<typeof pactum.spec>;
type HttpMethod = 'DELETE' | 'GET' | 'POST' | 'PUT';
type RelativePathString = `/${string}`;
type UrlString = `http://${string}` | `https://${string}`;
type SpecCreatorConfigOptions = {
  baseUrl: UrlString;
};
type SpecCreatorConfig<T> = {
  method: HttpMethod;
  options?: SpecCreatorConfigOptions;
  path: RelativePathString;
  request?: T;
};

export interface BaseRequest {
  headers?: unknown;
  json?: unknown;
  params?: unknown;
  query?: unknown;
}

const defaultCreatorConfigOptions: SpecCreatorConfigOptions = {
  baseUrl: (env.BASE_REST_URL || env.BASE_URL) as UrlString,
};

export const createSpec = <T extends BaseRequest>(
  config: SpecCreatorConfig<T>,
): PactumSpec => {
  const { method, options, path, request } = config;

  const { baseUrl } = {
    ...defaultCreatorConfigOptions,
    ...options,
  };

  const pactumSpec = pactum.spec();

  pactumSpec.withMethod(method).withPath(`${baseUrl}${path}`);

  if (request?.json) pactumSpec.withJson(request.json);
  if (request?.query) pactumSpec.withQueryParams(request.query);
  if (request?.params) pactumSpec.withPathParams(request.params);
  if (request?.headers) pactumSpec.withHeaders(request.headers);

  return pactumSpec;
};
