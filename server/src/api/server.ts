import Express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { router } from "./router";
import { errorHandler } from "../utils/error.handler";
import { Server } from "http";
import { AddressInfo } from "net";
import helmet from "helmet";
import morgan from "morgan";
import * as configProvider from "../utils/config.provider";
import configSchema from "../../config";
import getDBConnectionPool from "../models/db";

let connection: Server;
config();

async function startWebServer(): Promise<AddressInfo> {
  const app = Express();
  initiateConfig(app);
  app.use(cors());
  app.use(helmet());
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  await connectToDatabase();
  app.use("/v1", router);
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Something went wrong");
  });

  defineErrorHandlingMiddleware(app);

  const APIAddress = await openConnection(app);
  return APIAddress;
}

async function openConnection(app: Application): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const portToListenTo = configProvider.getValue("port");
    const webServerPort = portToListenTo || 0;
    console.log(`Server is about to listen to port ${webServerPort}`);
    connection = app.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
}

async function initiateConfig(app: Application) {
  if (process.env.NODE_ENV === "development") {
    config();
    app.use(morgan("dev"));
  }
  configProvider.initializeAndValidate(configSchema);
}

async function connectToDatabase() {
  const pool = getDBConnectionPool();
}

function defineErrorHandlingMiddleware(app: Application) {
  app.use(
    async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: any,
      req: Request,
      res: Response,
      // Express requires next function in default error handlers
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction
    ) => {
      if (error && typeof error === "object") {
        if (error.isTrusted === undefined || error.isTrusted === null) {
          error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
        }
      }
      // ✅ Best Practice: Pass all error to a centralized error handler so they get treated equally
      errorHandler.handleError(error);
      res.status(error?.HTTPStatus || 500).end();
    }
  );
}

async function stopWebServer() {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve();
      });
    }
  });
}

export { startWebServer, stopWebServer };
