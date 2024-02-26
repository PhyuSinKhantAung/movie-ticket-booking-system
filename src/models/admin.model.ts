import mongoose, { Document } from "mongoose";
import { ROLES } from "src/validations/admin.schema";
import bcrypt from "bcrypt";

export interface Admin extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  theatre: mongoose.Schema.Types.ObjectId;
}

const AdminSchema = new mongoose.Schema<Admin>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ROLES,
    required: true,
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Theatre",
  },
});

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  return next();
});

export default mongoose.model<Admin>("Admin", AdminSchema);
