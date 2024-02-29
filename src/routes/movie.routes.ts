import { Router } from "express";
import authenticator from "src/middlewares/authenticator";
import validator from "src/middlewares/validator";
import { upload, uploadToCloudinary } from "src/middlewares/imageUploader";
import {
  createMovieSchema,
  getMoviesSchema,
  movieIdParamsSchema,
  updateMovieSchema,
} from "src/validations/movie.schema";
import MovieController from "src/controllers/movie.controller";

class MovieRoutes {
  router = Router();
  controller = new MovieController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      validator({ query: getMoviesSchema }),
      this.controller.getMovies.bind(this.controller),
    );

    this.router.get(
      "/:id",
      validator({ params: movieIdParamsSchema }),
      this.controller.getMovieById.bind(this.controller),
    );

    this.router.post(
      "/",
      authenticator as never,
      upload.single("image"),
      uploadToCloudinary,
      validator({ body: createMovieSchema }),
      this.controller.createMovie.bind(this.controller),
    );

    this.router.patch(
      "/:id",
      authenticator as never,
      upload.array("images", 8),
      //   upload.fields([
      //     { name: "image", maxCount: 1 },
      //     { name: "images", maxCount: 5 },
      //   ]),
      uploadToCloudinary,
      validator({ params: movieIdParamsSchema, body: updateMovieSchema }),
      this.controller.updateMovieById.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      authenticator as never,
      validator({ params: movieIdParamsSchema }),
      this.controller.deleteMovieById.bind(this.controller),
    );
  }
}

export default new MovieRoutes().router;
