import { Router } from "express";
import { getStockChartInformation, getSectorChartInformation } from "../../controllers/chartController";

const router = Router();

router.get("/", getStockChartInformation);
router.get("/sector", getSectorChartInformation)

export { router as chartRouter }