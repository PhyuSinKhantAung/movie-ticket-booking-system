import BookingModel from "src/models/booking.model";
import APIFeatures from "src/utils/api-feature.util";
import { ContentNotFoundException } from "src/utils/http-exceptions.util";
import {
  CreateBookingBody,
  GetBookingsQuery,
  UpdateBookingStatusBody,
} from "src/validations/booking.schema";

export default class BookingService {
  Model = BookingModel;

  async create(data: CreateBookingBody) {
    const booking = await this.Model.create(data);
    return booking;
  }

  async getAll(query: GetBookingsQuery) {
    const customFilter = {
      ...(query.search
        ? { name: { $regex: query.search, $options: "i" } }
        : {}),
    };

    const features = new APIFeatures(
      this.Model.find().populate(["venue", "showtime", "seats"]),
      query,
    )
      .filter(customFilter)
      .paginate()
      .limitFields()
      .sort()
      .count(customFilter);

    const [data, count] = await Promise.all([
      features.query,
      this.Model.countDocuments(features.queryObject),
    ]);

    return { data, count };
  }

  async getById(id: string) {
    const booking = await this.Model.findById(id);
    if (!booking) throw new ContentNotFoundException("Booking not found");
    return booking;
  }

  async updateBookingStatusById(id: string, update: UpdateBookingStatusBody) {
    const booking = await this.Model.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!booking) throw new ContentNotFoundException("Booking not found");
    return booking;
  }

  async deleteById(id: string) {
    await this.Model.findByIdAndDelete(id);
  }
}
