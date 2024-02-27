import {
  signInUserSchema,
  signUpUserSchema,
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

    //TODO will integrate forgot password/ reset password logic soon
  }
}

export default new UserRoutes().router;
