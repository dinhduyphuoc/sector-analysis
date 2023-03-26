import { Request, Response } from "express";

class GetStockData {
  public index(req: Request, res: Response): void {
    res.send("Hello World!");
  }

  public history(req: Request, res: Response): void {
    res.send("Hello World History!");
  }
}

export default GetStockData;
