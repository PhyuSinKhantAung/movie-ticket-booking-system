import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  name: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  passwordResetExpires: Date;
  passwordResetToken: string;
  active: boolean;
  //TODo will fix this as reference
  //   location: mongoose.Schema.Types.ObjectId;
  location: string;
}

const UserSchema = new mongoose.Schema<User>({
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
  passwordChangedAt: Date,
  passwordResetExpires: Date,
  passwordResetToken: String,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  location: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  return next();
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

export default mongoose.model<User>("User", UserSchema);
