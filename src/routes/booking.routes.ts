import { Router } from "express";
import BookingController from "src/controllers/booking.controller";
import authenticator from "src/middlewares/authenticator";
import validator from "src/middlewares/validator";

import {
  createBookingSchema,
  getBookingsSchema,
  bookingIdParamsSchema,
  updateBookingStatusSchema,
} from "src/validations/booking.schema";
import authorizor from "src/middlewares/authorizor";

class BookingRoutes {
  router = Router();
  controller = new BookingController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      authenticator as never,
      authorizor({
        roles: ["operator"],
        types: ["admin"],
      }) as never,
      validator({ query: getBookingsSchema }),
      this.controller.getBookings.bind(this.controller),
    );

    this.router.get(
      "/:id",
      authenticator as never,
      authorizor({
        roles: ["operator"],
        types: ["admin"],
      }) as never,
      validator({ params: bookingIdParamsSchema }),
      this.controller.getBookingById.bind(this.controller),
    );

    this.router.post(
      "/",
      authenticator as never,
      authorizor({
        roles: ["user"],
        types: ["user"],
      }) as never,
      validator({ body: createBookingSchema }),
      this.controller.createBooking.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      authorizor({
        roles: ["user", "operator"],
        types: ["user", "admin"],
      }) as never,
      validator({
        params: bookingIdParamsSchema,
        body: updateBookingStatusSchema,
      }),
      this.controller.updateBookingById.bind(this.controller),
    );
  }
}

export default new BookingRoutes().router;
