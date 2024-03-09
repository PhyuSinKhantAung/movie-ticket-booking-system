import {
  createShowtimeSchema,
  updateShowtimeSchema,
} from "./../validations/showtime.schema";
import { Router } from "express";
import authenticator from "src/middlewares/authenticator";
import validator from "src/middlewares/validator";

import ShowtimeController from "src/controllers/showtime.controller";
import {
  getShowtimesSchema,
  showtimeIdParamsSchema,
} from "src/validations/showtime.schema";

class VenueRoutes {
  router = Router();
  controller = new ShowtimeController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      authenticator as never,
      validator({ query: getShowtimesSchema }),
      this.controller.getShowtimes.bind(this.controller),
    );

    this.router.get(
      "/:id",
      authenticator as never,
      validator({ params: showtimeIdParamsSchema }),
      this.controller.getShowtimeById.bind(this.controller),
    );

    this.router.post(
      "/",
      authenticator as never,
      validator({ body: createShowtimeSchema }),
      this.controller.createShowtime.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      validator({ params: showtimeIdParamsSchema, body: updateShowtimeSchema }),
      this.controller.updateShowtimeById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      validator({ params: showtimeIdParamsSchema }),
      this.controller.deleteShowtimeById.bind(this.controller),
    );
  }
}

export default new VenueRoutes().router;
