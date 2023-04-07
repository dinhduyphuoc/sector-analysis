import { Router } from "express";
import { insightRouter } from "./insightRoute";

const router = Router();

const defaultRoutes = [
    {
        path: "/stock-insight",
        router: insightRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.router);
});

export { router };