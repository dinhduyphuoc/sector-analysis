import { Router } from "express";
import { chartRouter } from "./chartRoute";
import { stockRouter } from "./stockRoute";
import { sectorRouter } from "./sectorRoute";

const router = Router();

const defaultRoutes = [
    {
        path: "/stock",
        router: stockRouter,
    },
    {
        path: "/chart",
        router: chartRouter
    },
    {
        path: "/sector",
        router: sectorRouter
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.router);
});

export { router };