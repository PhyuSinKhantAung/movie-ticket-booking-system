import {
  adminIdParamsSchema,
  createAdminBodySchema,
  getAdminsSchema,
  logInAdminSchema,
  updateAdminSchema,
} from "./../validations/admin.schema";
import { Router } from "express";
import AdminController from "src/controllers/admin.controller";
import authenticator from "src/middlewares/authenticator";
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

    this.router.post(
      "/login",
      validator({ body: logInAdminSchema }),
      this.controller.login.bind(this.controller),
    );

    // ** Warning these below routes will be required authentication **//
    this.router.get(
      "/",
      authenticator as never,
      validator({ query: getAdminsSchema }),
      this.controller.getAdmins.bind(this.controller),
    );

    this.router.get(
      "/:id",
      authenticator as never,
      validator({ params: adminIdParamsSchema }),
      this.controller.getAdminById.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      validator({ params: adminIdParamsSchema, body: updateAdminSchema }),
      this.controller.updateAdminById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      validator({ params: adminIdParamsSchema }),
      this.controller.deleteAdminById.bind(this.controller),
    );
  }
}

export default new AdminRoutes().router;
