import { Router } from "express";
import { chartRouter } from "../components/chart/chartRoute";
import { stockRouter } from "../components/stock/stockRoute";
import { sectorRouter } from "../components/sector/sectorRoute";

const router = Router();

const defaultRoutes = [
  {
    path: "/stock",
    router: stockRouter,
  },
  {
    path: "/chart",
    router: chartRouter,
  },
  {
    path: "/sector",
    router: sectorRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export { router };
