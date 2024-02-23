import { Request, Response, NextFunction } from "express";
import catchAsync from "src/utils/catchAsync";
export default class AdminController {
  wrapper = catchAsync;

  async create() {
    return catchAsync(async function createAdmin(
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      console.log("hello world");
      console.log(req.body);
      res.json({ message: "success" });
    });
  }
}
