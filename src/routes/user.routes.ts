import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInUserSchema,
  signUpUserSchema,
  tokenSchema,
} from "./../validations/user.schema";
import { Router } from "express";
import UserController from "src/controllers/user.controller";
import validator from "src/middlewares/validator";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/signup",
      validator({
        body: signUpUserSchema,
      }),
      this.controller.signup.bind(this.controller),
    );

    this.router.post(
      "/signin",
      validator({
        body: signInUserSchema,
      }),
      this.controller.signin.bind(this.controller),
    );

    this.router.post(
      "/forgotPassword",
      validator({ body: forgotPasswordSchema }),
      this.controller.forgotPassword.bind(this.controller),
    );

    this.router.patch(
      "/resetPassword/:token",
      validator({ body: resetPasswordSchema, params: tokenSchema }),
      this.controller.resetPassword.bind(this.controller),
    );
    this.router.post(
      "/refreshToken",
      validator({ body: tokenSchema }),
      this.controller.refreshToken.bind(this.controller),
    );
  }
}

export default new UserRoutes().router;
