import { NextFunction, Request, Response } from "express";
import SeatService from "src/services/seat.service";
import { GetSeatsQuery } from "src/validations/seat.schema";

export default class SeatController {
  service = new SeatService();

  async createSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getSeats(
    req: Request<unknown, unknown, unknown, GetSeatsQuery>,
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

  async getSeatById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateSeatStatusById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.updateSeatStatusById(
        req.params.id,
        req.body,
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteSeatById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteById(req.params.id);
      res.json({
        message: "Seat has been deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}
