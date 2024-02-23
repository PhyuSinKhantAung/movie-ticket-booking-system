import { Request, Response, Router } from "express";
import { Application } from "express";
import AdminRoutes from "./admin.routes";
import { ContentNotFoundException } from "src/utils/http-exceptions.util";
import errorHandler from "src/middlewares/errorHandler";

export default class Routes {
  router = Router();

  constructor(app: Application) {
    const apiRouter = this.router;

    apiRouter.use("/admins", AdminRoutes);

    app.get("/", function (_req: Request, res: Response) {
      res.send("Welcome to movie ticket booking application");
    });

    app.use(function (_req: Request, res: Response, next) {
      next(new ContentNotFoundException("Resource not found"));
    });

    app.use(errorHandler);

    app.use("/api", apiRouter);
  }
}
