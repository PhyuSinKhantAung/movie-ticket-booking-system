import { NextFunction, Request, Response } from "express";
import BookingService from "src/services/booking.service";
import SeatService from "src/services/seat.service";
import { GetBookingsQuery } from "src/validations/booking.schema";
import { VenueIdParams } from "src/validations/venue.schema";

export default class BookingController {
  service = new BookingService();
  seatService = new SeatService();

  async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      await this.seatService.updateSeatStatuses(req.body.seats, {
        status: "reserved",
      });

      const data = await this.service.create(req.body);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getBookings(
    req: Request<VenueIdParams, unknown, unknown, GetBookingsQuery>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const venueId = req.params.id;
      const userId = req.user.type === "user" ? req.user.id : null;
      const data = await this.service.getAll(req.query, venueId, userId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getBookingById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateBookingById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.updateBookingStatusById(
        req.params.id,
        req.body,
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}
