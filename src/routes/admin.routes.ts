import { createAdminBodySchema } from "./../validations/admin.schema";
import { Router } from "express";
import AdminController from "src/controllers/admin.controller";
import validator from "src/middlewares/validator";

class AdminRoutes {
  router = Router();
  controller = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/",
      validator({ body: createAdminBodySchema }),
      this.controller.createAdmin.bind(this.controller),
    );
  }
}

export default new AdminRoutes().router;
