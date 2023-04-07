import { Router } from "express";
import { getStockInsightData } from "../../controllers/insightController";

const router = Router();

router.get("/", getStockInsightData);

export { router as insightRouter };