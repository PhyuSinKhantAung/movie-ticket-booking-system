import { Router } from "express";
import AdminController from "src/controllers/admin.controller";

class AdminRoutes {
  router = Router();
  controller = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.controller.getAdmins);
  }
}

export default new AdminRoutes().router;
