import { NextFunction, Request, Response } from "express";
import AdminService from "src/services/admin.service";
import { GetAdminsQuery } from "src/validations/admin.schema";
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

  async getAdmins(
    req: Request<unknown, unknown, unknown, GetAdminsQuery>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await this.service.getAll(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAdminById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateAdminById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.updateById(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteAdminById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteById(req.params.id);
      res.json({
        message: "Admin has been deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}
