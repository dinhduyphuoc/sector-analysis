import { Router } from "express";
import {
  getStockChartInformation,
  getSectorChartInformation,
  getFundamentalChartInformation,
} from "./chartController";

const router = Router();

router.get("/", getStockChartInformation);
router.get("/sector", getSectorChartInformation);
router.get("/fundamental", getFundamentalChartInformation);

export { router as chartRouter };
