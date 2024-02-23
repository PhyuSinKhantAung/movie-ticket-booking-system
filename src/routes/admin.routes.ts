import { Router } from "express";
import AdminController from "src/controllers/admin.controller";

class AdminRoutes {
  router = Router();
  controller = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/", this.controller.create);
  }
}

export default new AdminRoutes().router;
