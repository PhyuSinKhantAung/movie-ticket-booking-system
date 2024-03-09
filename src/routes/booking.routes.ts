import { Router } from "express";
import BookingController from "src/controllers/booking.controller";
import authenticator from "src/middlewares/authenticator";
import validator from "src/middlewares/validator";
import { upload, uploadToCloudinary } from "src/middlewares/imageUploader";

import {
  createBookingSchema,
  getBookingsSchema,
  bookingIdParamsSchema,
  updateBookingStatusSchema,
} from "src/validations/booking.schema";

class BookingRoutes {
  router = Router();
  controller = new BookingController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      validator({ query: getBookingsSchema }),
      this.controller.getBookings.bind(this.controller),
    );

    this.router.get(
      "/:id",
      validator({ params: bookingIdParamsSchema }),
      this.controller.getBookingById.bind(this.controller),
    );

    this.router.post(
      "/",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary as never,
      validator({ body: createBookingSchema }),
      this.controller.createBooking.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary as never,
      validator({
        params: bookingIdParamsSchema,
        body: updateBookingStatusSchema,
      }),
      this.controller.updateBookingById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      validator({ params: bookingIdParamsSchema }),
      this.controller.deleteBookingById.bind(this.controller),
    );
  }
}

export default new BookingRoutes().router;
