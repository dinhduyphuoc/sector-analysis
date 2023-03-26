import { Router } from "express";
import GetStockData from "./actions/getStockData";
import BaseController from "../../common/BaseController";

const getStockData = new GetStockData();

const router: Router = Router();

class StocksController extends BaseController {
  public get router(): Router {
    router.get("/stock", getStockData.index);
    router.get("/stock/history/", getStockData.history);

    return router;
  }
}

export default StocksController;
