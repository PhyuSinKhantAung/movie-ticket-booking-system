import ShowtimeModel from "src/models/showtime.model";
import APIFeatures from "src/utils/api-feature.util";
import { ContentNotFoundException } from "src/utils/http-exceptions.util";
import {
  CreateShowtimeBody,
  GetShowtimesQuery,
  UpdateShowtimeBody,
} from "src/validations/showtime.schema";

export default class ShowtimeService {
  Model = ShowtimeModel;

  async create(data: CreateShowtimeBody) {
    const showtime = await this.Model.create(data);
    return showtime;
  }

  async getAll(query: GetShowtimesQuery) {
    const customFilter = {
      ...(query.search
        ? { name: { $regex: query.search, $options: "i" } }
        : {}),
    };

    const features = new APIFeatures(
      this.Model.find().populate(["theatre", "movie", "venue"]),
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
    const showtime = await this.Model.findById(id);
    if (!showtime) throw new ContentNotFoundException("showtime not found");
    return showtime;
  }

  async updateById(id: string, update: UpdateShowtimeBody) {
    const showtime = await this.Model.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!showtime) throw new ContentNotFoundException("showtime not found");
    return showtime;
  }

  async deleteById(id: string) {
    await this.Model.findByIdAndDelete(id);
  }
}
