import VenueModel from "src/models/venue.model";
import APIFeatures from "src/utils/api-feature.util";
import { ContentNotFoundException } from "src/utils/http-exceptions.util";
import {
  CreateVenueBody,
  GetVenuesQuery,
  UpdateVenueBody,
} from "src/validations/venue.schema";

export default class VenueService {
  Model = VenueModel;

  async create(data: CreateVenueBody) {
    const venue = await this.Model.create(data);
    return venue;
  }

  async getAll(query: GetVenuesQuery) {
    const customFilter = {
      ...(query.search
        ? { name: { $regex: query.search, $options: "i" } }
        : {}),
    };

    const features = new APIFeatures(
      this.Model.find().populate("theatre"),
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
    const venue = await this.Model.findById(id);
    if (!venue) throw new ContentNotFoundException("Venue not found");
    return venue;
  }

  async updateById(id: string, update: UpdateVenueBody) {
    const venue = await this.Model.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!venue) throw new ContentNotFoundException("Venue not found");
    return venue;
  }

  async deleteById(id: string) {
    await this.Model.findByIdAndDelete(id);
  }
}
