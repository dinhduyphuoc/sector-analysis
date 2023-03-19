import { Router } from "express";
import Controllers from "../controllers/controllers";

// Settings
const router: Router = Router();
const { Stock } = Controllers;

// Stock
router.get("/stock/", Stock.index);

export default router;
