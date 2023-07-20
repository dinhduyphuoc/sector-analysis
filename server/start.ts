import { startWebServer } from "./src/api/server";
import { AppError, errorHandler } from "./src/utils/error.handler";
import logger from "./src/utils/logger";

async function start() {
  return Promise.all([startWebServer()]);
}

start()
  .then((startResponses) => {
    logger.info(`The app has started successfully ${startResponses}}`);
  })
  .catch((error) => {
    errorHandler.handleError(
      new AppError("startup-failure", error.message, 500, false, error)
    );
  });
