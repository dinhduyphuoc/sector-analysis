import { Router } from "express";
import WebSocket from "ws";
import {
  getStockInsightData,
  getStockClosePrices,
  getStocks,
  getStockInfo,
  getStockScore,
} from "./stockController";

const router = Router();

router.get("/", getStockInsightData);
router.get("/close", getStockClosePrices);
router.get("/list", getStocks);
router.get("/info/:ticker", getStockInfo);
router.get("/score/:ticker", getStockScore);

export { router as stockRouter };
