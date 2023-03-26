import { Router } from "express";

class BaseController {
  public get router(): Router {
    return Router();
  }
}

export default BaseController;
