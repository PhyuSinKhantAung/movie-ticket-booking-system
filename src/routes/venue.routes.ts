import { Router } from "express";
import VenueController from "src/controllers/venue.controller";
import authenticator from "src/middlewares/authenticator";
import validator from "src/middlewares/validator";
import { upload, uploadToCloudinary } from "src/middlewares/imageUploader";

import {
  createVenueSchema,
  getVenuesSchema,
  venueIdParamsSchema,
  updateVenueSchema,
} from "src/validations/venue.schema";

class VenueRoutes {
  router = Router();
  controller = new VenueController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      validator({ query: getVenuesSchema }),
      this.controller.getVenues.bind(this.controller),
    );

    this.router.get(
      "/:id",
      validator({ params: venueIdParamsSchema }),
      this.controller.getVenueById.bind(this.controller),
    );

    this.router.post(
      "/",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary,
      validator({ body: createVenueSchema }),
      this.controller.createVenue.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary,
      validator({ params: venueIdParamsSchema, body: updateVenueSchema }),
      this.controller.updateVenueById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      validator({ params: venueIdParamsSchema }),
      this.controller.deleteVenueById.bind(this.controller),
    );
  }
}

export default new VenueRoutes().router;
