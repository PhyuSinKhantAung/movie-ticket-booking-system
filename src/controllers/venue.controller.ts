import { NextFunction, Request, Response } from "express";
import VenueService from "src/services/venue.service";
import { GetVenuesQuery } from "src/validations/venue.schema";

export default class VenueController {
  service = new VenueService();

  async createVenue(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getVenues(
    req: Request<unknown, unknown, unknown, GetVenuesQuery>,
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

  async getVenueById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateVenueById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.updateById(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteVenueById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteById(req.params.id);
      res.json({
        message: "Venue has been deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}
