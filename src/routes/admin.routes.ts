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
import authorizor from "src/middlewares/authorizor";
import validator from "src/middlewares/validator";
import { tokenSchema } from "src/validations/user.schema";

class AdminRoutes {
  router = Router();
  controller = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/login",
      validator({ body: logInAdminSchema }),
      this.controller.login.bind(this.controller),
    );

    this.router.post(
      "/refreshToken",
      validator({ body: tokenSchema }),
      this.controller.refreshToken.bind(this.controller),
    );

    this.router.post(
      "/",
      authenticator as never,
      authorizor({ roles: ["supervisor"], types: ["admin"] }) as never,
      validator({ body: createAdminBodySchema }),
      this.controller.createAdmin.bind(this.controller),
    );

    this.router.get(
      "/",
      authenticator as never,
      authorizor({ roles: ["supervisor"], types: ["admin"] }) as never,
      validator({ query: getAdminsSchema }),
      this.controller.getAdmins.bind(this.controller),
    );

    this.router.get(
      "/:id",
      authenticator as never,
      authorizor({ roles: ["supervisor"], types: ["admin"] }) as never,
      validator({ params: adminIdParamsSchema }),
      this.controller.getAdminById.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      authorizor({ roles: ["supervisor"], types: ["admin"] }) as never,
      validator({ params: adminIdParamsSchema, body: updateAdminSchema }),
      this.controller.updateAdminById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      authorizor({ roles: ["supervisor"], types: ["admin"] }) as never,
      validator({ params: adminIdParamsSchema }),
      this.controller.deleteAdminById.bind(this.controller),
    );
  }
}

export default new AdminRoutes().router;
