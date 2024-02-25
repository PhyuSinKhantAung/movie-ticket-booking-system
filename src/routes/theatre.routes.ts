import { Router } from "express";
import TheatreController from "src/controllers/theatre.controller";
import validator from "src/middlewares/validator";
import {
  createTheatreSchema,
  getTheatresSchema,
  theatreIdParamsSchema,
} from "src/validations/theatre.schema";

class TheatreRoutes {
  router = Router();
  controller = new TheatreController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/",
      validator({ body: createTheatreSchema }),
      this.controller.createTheatre.bind(this.controller),
    );

    this.router.get(
      "/",
      validator({ query: getTheatresSchema }),
      this.controller.getTheatres.bind(this.controller),
    );

    this.router.get(
      "/:id",
      validator({ params: theatreIdParamsSchema }),
      this.controller.getTheatreById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      validator({ params: theatreIdParamsSchema }),
      this.controller.deleteTheatreById.bind(this.controller),
    );
  }
}

export default new TheatreRoutes().router;
