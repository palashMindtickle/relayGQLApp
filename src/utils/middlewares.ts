import { GQL_ENDPOINTS, getUrlMiddleware } from "@mindtickle/relay-core";

export function getMiddlewares() {
  return [getUrlMiddleware(GQL_ENDPOINTS.TEST)];
}
