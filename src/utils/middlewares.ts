import { GQL_ENDPOINTS, getUrlMiddleware } from '@mindtickle/relay-core';
import { Middleware } from 'react-relay-network-modern';

export function getMiddlewares(): Middleware[] {
  return [getUrlMiddleware(GQL_ENDPOINTS.TEST)];
}
