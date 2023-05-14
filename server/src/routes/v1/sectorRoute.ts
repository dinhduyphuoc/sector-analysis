import { Router } from "express";
import { getSectorsList, getSectorData } from "../../controllers/sectorController";

const router = Router();

router.get("/list", getSectorsList);
router.get("/sectordata", getSectorData);

export { router as sectorRouter };