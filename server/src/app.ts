import Express, { Request, Response } from "express";
import router from "./controllers";

const app = Express();
const port: number = 3000;

app.use(Express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "sector-analysis-api",
    version: "1.0.0",
  });
});

app.use("/v1/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
