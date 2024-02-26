import UserModel from "src/models/user.model";
import {
  ContentNotFoundException,
  ExistenceConflictException,
} from "src/utils/http-exceptions.util";
import { SignUpUserBody } from "src/validations/user.schema";

export default class UserService {
  Model = UserModel;
  async create(data: SignUpUserBody) {
    const existingUser = await this.Model.findOne({ email: data.email });
    if (existingUser)
      throw new ExistenceConflictException("User already exist.");

    const newUser = await this.Model.create(data);

    newUser.password = "";

    return newUser;
  }

  async getUserByEmail(email: string, isSelectPassword: boolean = false) {
    const user = isSelectPassword
      ? await this.Model.findOne({ email }).select("+password")
      : await this.Model.findOne({ email });

    if (!user)
      throw new ContentNotFoundException("User not found by this email");

    return user;
  }
}
