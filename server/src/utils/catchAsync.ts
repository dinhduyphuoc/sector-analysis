import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

export default catchAsync;
