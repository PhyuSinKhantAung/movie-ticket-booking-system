import { NextFunction, Request, Response } from "express";
import UserService from "src/services/user.service";
import { SignInUserBody, SignUpUserBody } from "src/validations/user.schema";
import AuthController from "./auth.controller";

export default class UserController {
  controller = new AuthController();
  service = new UserService();
  async signup(
    req: Request<unknown, unknown, SignUpUserBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await this.service.create(req.body);

      const payload = {
        id: user._id.toString(),
        email: user.email,
        type: "user",
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

  async signin(
    req: Request<unknown, unknown, SignInUserBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await this.service.getUserByEmail(req.body.email, true);

      await this.controller.verifyPassword(req.body.password, user.password);

      const payload = {
        id: user._id.toString(),
        email: user.email,
        type: "user",
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
}
