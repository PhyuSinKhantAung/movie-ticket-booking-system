import { reshapedSeatStructure } from "src/helpers/seat.helper";
import { UpdateSeatStatusBody } from "./../validations/seat.schema";
import SeatModel from "src/models/seat.model";
import APIFeatures from "src/utils/api-feature.util";
import { ContentNotFoundException } from "src/utils/http-exceptions.util";
import { CreateSeatBody, GetSeatsQuery } from "src/validations/seat.schema";

export default class SeatService {
  Model = SeatModel;

  async create(data: CreateSeatBody) {
    const { rows, columns, showtime } = data;
    const seats = reshapedSeatStructure(+rows, +columns, showtime);
    await this.Model.insertMany(seats);
  }

  async getAll(query: GetSeatsQuery) {
    const customFilter = {
      ...(query.search
        ? { name: { $regex: query.search, $options: "i" } }
        : {}),
    };

    const features = new APIFeatures(this.Model.find(), query)
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
    const seat = await this.Model.findById(id);
    if (!seat) throw new ContentNotFoundException("Seat not found");
    return seat;
  }

  async updateSeatStatuses(ids: string[], update: UpdateSeatStatusBody) {
    ids.map(async (id) => {
      const seat = await this.Model.findByIdAndUpdate(id, update, {
        new: true,
      });
      if (!seat) throw new ContentNotFoundException("Seat not found");

      return seat;
    });
  }

  async updateSeatStatusById(id: string, update: UpdateSeatStatusBody) {
    const seat = await this.Model.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!seat) throw new ContentNotFoundException("Seat not found");
    return seat;
  }

  async deleteById(id: string) {
    await this.Model.findByIdAndDelete(id);
  }
}
