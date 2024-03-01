import MovieTimeModel from "src/models/movieTime.model";

export default class MovieTimeService {
  Model = MovieTimeModel;

  async create(data) {
    const movieTime = await this.Model.create(data);
    return movieTime;
  }
}
