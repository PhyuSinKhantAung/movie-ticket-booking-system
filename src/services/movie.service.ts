import MovieModel from "src/models/movie.model";
import APIFeatures from "src/utils/api-feature.util";
import { ContentNotFoundException } from "src/utils/http-exceptions.util";
import {
  CreateMovieBody,
  GetMoviesQuery,
  UpdateMovieBody,
} from "src/validations/movie.schema";

export default class MovieService {
  Model = MovieModel;

  async create(data: CreateMovieBody) {
    const movie = await this.Model.create(data);
    return movie;
  }

  async getAll(query: GetMoviesQuery) {
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
    const movie = await this.Model.findById(id);
    if (!movie) throw new ContentNotFoundException("Movie not found");
    return movie;
  }

  async updateById(id: string, update: UpdateMovieBody) {
    const movie = await this.Model.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!movie) throw new ContentNotFoundException("Movie not found");
    return movie;
  }

  async deleteById(id: string) {
    await this.Model.findByIdAndDelete(id);
  }
}
