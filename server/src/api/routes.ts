import { Router } from "express";
import Controllers from "../controllers/controllers";

const { Stock } = Controllers;

// Settings
const router: Router = Router();

// Stock Data Routes
router.get("/stock/", Stock.index);

export default router;
