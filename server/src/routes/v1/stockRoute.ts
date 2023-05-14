import { Router } from "express";
import { getStockInsightData, getStockClosePrices, getSectorsList, getStocks } from "../../controllers/stockController";

const router = Router();

router.get("/", getStockInsightData);
router.get("/close", getStockClosePrices);
router.get("/stocks", getStocks)

export { router as stockRouter };