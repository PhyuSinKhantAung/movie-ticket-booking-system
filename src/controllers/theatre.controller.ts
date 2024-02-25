import { NextFunction, Request, Response } from "express";
import TheatreService from "src/services/theatre.service";

export default class TheatreController {
  service = new TheatreService();

  async createTheatre(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getTheatres(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getTheatreById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteTheatreById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteById(req.params.id);
      res.json({
        message: "Theatre has been deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}
