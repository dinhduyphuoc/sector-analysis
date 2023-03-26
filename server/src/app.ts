import Express, { Request, Response } from "express";
import router from "./controllers";
import pool from "./models/db";

const app = Express();
const port: number = 3000;

app.use(Express.json());

pool.connect();

app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "sector-analysis-api",
    version: "1.0.0",
  });
});

app.get("/test", (req: Request, res: Response) => {
  pool.query('SELECT * FROM "FinancialStatements"', (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send(result.rows);
  });
})

app.use("/v1/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
