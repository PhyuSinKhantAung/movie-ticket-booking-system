import { NextFunction, Response, Request } from "express";
import { Movie } from "src/models/movie.model";
import AdminService from "src/services/admin.service";
import MovieService from "src/services/movie.service";
import convertHourAndMinIntoSeconds from "src/utils/convertHourAndMinIntoSeconds";
import { CreateMovieBody, GetMoviesQuery } from "src/validations/movie.schema";

export default class MovieController {
  service = new MovieService();
  adminService = new AdminService();

  async createMovie(
    req: Request<unknown, unknown, CreateMovieBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { hour, minute } = req.body;

      const duration = convertHourAndMinIntoSeconds(hour, minute);

      const payload = { ...req.body, duration };

      const data: Movie = await this.service.create(payload);

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
