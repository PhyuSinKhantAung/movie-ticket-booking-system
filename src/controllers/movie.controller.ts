import { NextFunction, Response, Request } from "express";
import MovieService from "src/services/movie.service";
import { GetMoviesQuery } from "src/validations/movie.schema";

export default class MovieController {
  service = new MovieService();

  async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("hi========>");

      const data = await this.service.create(req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getMovies(
    req: Request<unknown, unknown, unknown, GetMoviesQuery>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await this.service.getAll(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getMovieById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateMovieById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.updateById(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteMovieById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteById(req.params.id);
      res.json({
        message: "Movie has been deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}
