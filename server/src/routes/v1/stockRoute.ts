import { Router } from "express";
import WebSocket from "ws";
import { getStockInsightData, getStockClosePrices, getStocks, getStockInfo } from "../../controllers/stockController";

const router = Router();


router.get("/", getStockInsightData);
router.get("/close", getStockClosePrices);
router.get("/list", getStocks)
router.get("/info/:ticker", getStockInfo);

export { router as stockRouter };