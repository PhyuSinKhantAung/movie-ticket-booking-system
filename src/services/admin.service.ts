import { ExistenceConflictException } from "src/utils/http-exceptions.util";
import AdminModel from "../models/admin.model";
import { CreateAdminBody } from "src/validations/admin.schema";

export default class AdminService {
  Model = AdminModel;

  async create(data: CreateAdminBody) {
    const existingAdmin = await this.Model.findOne({ email: data.email });

    if (existingAdmin)
      throw new ExistenceConflictException("Admin already exists");

    const newAdmin = await this.Model.create(data);

    return newAdmin;
  }
}
