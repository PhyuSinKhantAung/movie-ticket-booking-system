import { NextFunction, Request, Response } from "express";
import AdminService from "src/services/admin.service";
export default class AdminController {
  service = new AdminService();

  async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}
