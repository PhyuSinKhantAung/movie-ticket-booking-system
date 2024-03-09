import { Request, Response, Router } from "express";
import { Application } from "express";
import { ContentNotFoundException } from "src/utils/http-exceptions.util";
import errorHandler from "src/middlewares/errorHandler";
import UserRoutes from "./user.routes";
import AdminRoutes from "./admin.routes";
import TheatreRoutes from "./theatre.routes";
import MovieRoutes from "./movie.routes";
import VenueRoutes from "./venue.routes";
import ShowtimeRoutes from "./showtime.routes";

export default class Routes {
  router = Router();

  constructor(app: Application) {
    const apiRouter = this.router;

    apiRouter.use("/admins", AdminRoutes);
    apiRouter.use("/theatres", TheatreRoutes);
    apiRouter.use("/users", UserRoutes);
    apiRouter.use("/movies", MovieRoutes);
    apiRouter.use("/venues", VenueRoutes);
    apiRouter.use("/showtimes", ShowtimeRoutes);

    app.use("/api", apiRouter);

    app.get("/", function (_req: Request, res: Response) {
      res.send("Welcome to movie ticket booking application");
    });

    app.use(function (_req: Request, res: Response, next) {
      next(new ContentNotFoundException("Resource not found"));
    });

    app.use(errorHandler);
  }
}
