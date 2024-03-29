import { Router } from "express";
import SeatController from "src/controllers/seat.controller";
import authenticator from "src/middlewares/authenticator";
import authorizor from "src/middlewares/authorizor";
import validator from "src/middlewares/validator";
import {
  createSeatShema,
  getSeatsSchema,
  seatIdParamsSchema,
  updateSeatStatusSchema,
} from "src/validations/seat.schema";

class SeatRoutes {
  router = Router();
  controller = new SeatController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      authenticator as never,
      authorizor({
        roles: ["operator", "user"],
        types: ["admin", "user"],
      }) as never,
      validator({ query: getSeatsSchema }),
      this.controller.getSeats.bind(this.controller),
    );

    this.router.get(
      "/:id",
      authenticator as never,
      authorizor({
        roles: ["operator", "user"],
        types: ["admin", "user"],
      }) as never,
      validator({ params: seatIdParamsSchema }),
      this.controller.getSeatById.bind(this.controller),
    );

    this.router.post(
      "/",
      authenticator as never,
      authorizor({ roles: ["operator"], types: ["admin"] }) as never,
      validator({ body: createSeatShema }),
      this.controller.createSeat.bind(this.controller),
    );

    this.router.patch(
      "/status/:id",
      authorizor({ roles: ["operator"], types: ["admin"] }) as never,
      authenticator as never,
      validator({ params: seatIdParamsSchema, body: updateSeatStatusSchema }),
      this.controller.updateSeatStatusById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      authorizor({ roles: ["operator"], types: ["admin"] }) as never,
      validator({ params: seatIdParamsSchema }),
      this.controller.deleteSeatById.bind(this.controller),
    );
  }
}

export default new SeatRoutes().router;
