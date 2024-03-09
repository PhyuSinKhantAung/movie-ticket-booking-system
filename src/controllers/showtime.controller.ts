import { NextFunction, Request, Response } from "express";
import ShowtimeService from "src/services/showtime.service";
import { GetShowtimesQuery } from "src/validations/showtime.schema";

export default class ShowtimeController {
  service = new ShowtimeService();

  async createShowtime(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getShowtimes(
    req: Request<unknown, unknown, unknown, GetShowtimesQuery>,
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

  async getShowtimeById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateShowtimeById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.updateById(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteShowtimeById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteById(req.params.id);
      res.json({
        message: "showtime has been deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}
