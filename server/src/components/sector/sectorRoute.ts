import { Router } from "express";
import {
  getSectorsList,
  getSectorData,
  getSectorFundamentalData,
  getSectorScore,
} from "./sectorController";

const router = Router();

router.get("/list", getSectorsList);
router.get("/sectordata", getSectorData);
router.get("/fundamental", getSectorFundamentalData);
router.get("/f-score", getSectorScore);

export { router as sectorRouter };
