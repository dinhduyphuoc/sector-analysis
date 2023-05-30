import { Router } from "express";
import { getSectorsList, getSectorData, getFundamentalData } from "../../controllers/sectorController";

const router = Router();

router.get("/list", getSectorsList);
router.get("/sectordata", getSectorData);
router.get("/fundamental", getFundamentalData)

export { router as sectorRouter };