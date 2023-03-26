import { Router } from "express";
import StocksController from "../modules/stocks/stocksController";
import BaseController from "../common/BaseController";

const router = Router();

const controllers: BaseController[] = [new StocksController()];

for (const controller of controllers) {
  router.use(controller.router);
}

export default router;
