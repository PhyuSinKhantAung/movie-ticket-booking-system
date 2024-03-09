import { NextFunction, Request, Response } from "express";
import AdminService from "src/services/admin.service";
import { BadRequestException } from "src/utils/http-exceptions.util";
import {
  CreateAdminBody,
  GetAdminsQuery,
  LogInAdminBody,
  ROLES,
} from "src/validations/admin.schema";
import AuthController from "./auth.controller";
import { Token } from "src/validations/user.schema";
export default class AdminController {
  service = new AdminService();
  controller = new AuthController();

  async createAdmin(
    req: Request<unknown, unknown, CreateAdminBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (req.body.role === ROLES[0] && !req.body.theatre)
        return next(
          new BadRequestException("Theatre is required for operator"),
        );

      if (req.body.role === ROLES[1] && req.body.theatre) {
        return next(
          new BadRequestException("Theatre is not required for supervisor"),
        );
      }

      const data = await this.service.create(req.body);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request<unknown, unknown, LogInAdminBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const admin = await this.service.getAdminByEmail(req.body.email, true);

      await this.controller.verifyPassword(req.body.password, admin.password);

      const payload = {
        id: admin._id.toString(),
        email: admin.email,
        type: "admin",
        role: admin.role,
      };

      const accessToken = await this.controller.generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET
          ? String(process.env.ACCESS_TOKEN_SECRET)
          : "",
        "1hr",
      );

      const refreshToken = await this.controller.generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET
          ? String(process.env.REFRESH_TOKEN_SECRET)
          : "",
        "30d",
      );

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    req: Request<unknown, unknown, Token, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken =
        await this.controller.generateAccessTokenWithRefreshToken(
          req.body.token,
        );
      res.json({ accessToken });
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
