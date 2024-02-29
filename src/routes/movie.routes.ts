import { Router } from "express";
import TheatreController from "src/controllers/theatre.controller";
import authenticator from "src/middlewares/authenticator";
import validator from "src/middlewares/validator";
import { upload, uploadToCloudinary } from "src/middlewares/imageUploader";
import {
  createMovieSchema,
  getMoviesSchema,
  movieIdParamsSchema,
  updateMovieSchema,
} from "src/validations/movie.schema";

class MovieRoutes {
  router = Router();
  controller = new TheatreController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      validator({ query: getMoviesSchema }),
      this.controller.getTheatres.bind(this.controller),
    );

    this.router.get(
      "/:id",
      validator({ params: movieIdParamsSchema }),
      this.controller.getTheatreById.bind(this.controller),
    );

    this.router.post(
      "/",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary,
      validator({ body: createMovieSchema }),
      this.controller.createTheatre.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary,
      validator({ params: movieIdParamsSchema, body: updateMovieSchema }),
      this.controller.updateTheatreById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      validator({ params: movieIdParamsSchema }),
      this.controller.deleteTheatreById.bind(this.controller),
    );
  }
}

export default new MovieRoutes().router;
