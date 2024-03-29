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
import authorizor from "src/middlewares/authorizor";

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
      authorizor({ roles: ["supervisor"], types: ["admin"] }) as never,
      upload.fields([{ name: "image", maxCount: 1 }]),
      uploadToCloudinary as never,
      validator({ body: createTheatreSchema }),
      this.controller.createTheatre.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      authorizor({ roles: ["supervisor"], types: ["admin"] }) as never,
      upload.fields([{ name: "image", maxCount: 1 }]),
      uploadToCloudinary as never,
      validator({ params: theatreIdParamsSchema, body: updateTheatreSchema }),
      this.controller.updateTheatreById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      authorizor({ roles: ["supervisor"], types: ["admin"] }) as never,
      validator({ params: theatreIdParamsSchema }),
      this.controller.deleteTheatreById.bind(this.controller),
    );
  }
}

export default new TheatreRoutes().router;
