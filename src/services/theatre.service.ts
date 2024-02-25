import TheatreModel from "src/models/theatre.model";
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

  async getAll(data: GetTheatresQuery) {
    console.log(data);
    const theatres = await this.Model.find();
    return theatres;
  }

  async getById(id: string) {
    console.log(id);
    const theatre = await this.Model.findById(id);
    if (!theatre) throw new ContentNotFoundException("Theatre not found");
    return theatre;
  }

  async deleteById(id: string) {
    console.log(id);
    await this.Model.findByIdAndDelete(id);
  }
}
