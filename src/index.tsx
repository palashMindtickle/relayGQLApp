import bootstrap, { initEnvironment } from "@mindtickle/relay-core";

import Application from "./components/root";
import { getMiddlewares } from "./utils/middlewares";

bootstrap(
  "root",
  { Application },
  initEnvironment.bind(undefined, {
    network: { middlewares: getMiddlewares() },
  })
);
