import TheatreModel from "src/models/theatre.model";
import APIFeatures from "src/utils/api-feature.util";
import { ContentNotFoundException } from "src/utils/http-exceptions.util";
import {
  CreateTheatreBody,
  GetTheatresQuery,
} from "src/validations/theatre.schema";

export default class TheatreService {
  Model = TheatreModel;

  async create(data: CreateTheatreBody) {
    const theatre = await this.Model.create(data);
    return theatre;
  }

  async getAll(query: GetTheatresQuery) {
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
    const theatre = await this.Model.findById(id);
    if (!theatre) throw new ContentNotFoundException("Theatre not found");
    return theatre;
  }

  async deleteById(id: string) {
    await this.Model.findByIdAndDelete(id);
  }
}
