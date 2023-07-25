import { Router } from "express";
import {
  getStockChartInformation,
  getSectorChartInformation,
  getDailyFundamentalChartData,
} from "./chartController";

const router = Router();

router.get("/", getStockChartInformation);
router.get("/sector", getSectorChartInformation);
router.get("/fundamental", getDailyFundamentalChartData);

export { router as chartRouter };
