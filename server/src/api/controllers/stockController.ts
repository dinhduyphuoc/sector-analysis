import { Request, Response } from "express";

class StockController {
  index(req: Request, res: Response) {
    res.send("This is a stock route");
  }
}

export default StockController;
