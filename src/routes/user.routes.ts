import {
  editUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  signInUserSchema,
  signUpUserSchema,
  tokenSchema,
} from "./../validations/user.schema";
import { Router } from "express";
import UserController from "src/controllers/user.controller";
import authenticator from "src/middlewares/authenticator";
import authorizor from "src/middlewares/authorizor";
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

    this.router.get(
      "/me",
      authenticator as never,
      authorizor({ roles: ["user"], types: ["user"] }) as never,
      this.controller.getMe.bind(this.controller),
    );

    this.router.patch(
      "/me",
      authenticator as never,
      authorizor({ roles: ["user"], types: ["user"] }) as never,
      validator({ body: editUserSchema }),
      this.controller.editMe.bind(this.controller),
    );
  }
}

export default new UserRoutes().router;
