import Express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import pool from "./models/db";
import { router } from "./routes/v1";

config();
const app = Express();
const port: number = process.env.PORT || 3000;

app.use(Express.json());
app.use(cors())

pool.connect();

app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "sector-analysis-api",
    version: "1.0.0",
  });
});

app.get("/test", (req: Request, res: Response) => {
  pool.query('SELECT * FROM "fin_state_items"', (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send(result.rows);
  });
})

// const date = new Date().toISOString().slice(0, 10);
// console.log(date);


app.use("/v1/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
