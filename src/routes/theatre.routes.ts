import { Router } from "express";
import TheatreController from "src/controllers/theatre.controller";
import authenticator from "src/middlewares/authenticator";
import validator from "src/middlewares/validator";
import { upload, uploadToCloudinary } from "src/middlewares/imageUploader";

import {
  createTheatreSchema,
  getTheatresSchema,
  theatreIdParamsSchema,
  updateTheatreSchema,
} from "src/validations/theatre.schema";

class TheatreRoutes {
  router = Router();
  controller = new TheatreController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
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

    this.router.post(
      "/",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary,
      validator({ body: createTheatreSchema }),
      this.controller.createTheatre.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary,
      validator({ params: theatreIdParamsSchema, body: updateTheatreSchema }),
      this.controller.updateTheatreById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      validator({ params: theatreIdParamsSchema }),
      this.controller.deleteTheatreById.bind(this.controller),
    );
  }
}

export default new TheatreRoutes().router;
