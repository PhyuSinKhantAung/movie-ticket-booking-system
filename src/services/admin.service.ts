import {
  ContentNotFoundException,
  ExistenceConflictException,
} from "src/utils/http-exceptions.util";
import AdminModel from "../models/admin.model";
import {
  CreateAdminBody,
  GetAdminsQuery,
  UpdateAdminBody,
} from "src/validations/admin.schema";
import APIFeatures from "src/utils/api-feature.util";

export default class AdminService {
  Model = AdminModel;

  async create(data: CreateAdminBody) {
    const existingAdmin = await this.Model.findOne({ email: data.email });

    if (existingAdmin)
      throw new ExistenceConflictException("Admin already exists");

    const newAdmin = await this.Model.create(data);

    newAdmin.password = "";

    return newAdmin;
  }

  async getAll(query: GetAdminsQuery) {
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
    const admin = await this.Model.findById(id);
    if (!admin) throw new ContentNotFoundException("Admin not found");
    return admin;
  }

  async getAdminByEmail(email: string, isSelectPassword: boolean = false) {
    const user = isSelectPassword
      ? await this.Model.findOne({ email }).select("+password")
      : await this.Model.findOne({ email });

    if (!user)
      throw new ContentNotFoundException("Admin not found by this email");

    return user;
  }

  async updateById(id: string, update: UpdateAdminBody) {
    const admin = await this.Model.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!admin) throw new ContentNotFoundException("Admin not found");
    return admin;
  }

  async deleteById(id: string) {
    await this.Model.findByIdAndDelete(id);
  }
}
