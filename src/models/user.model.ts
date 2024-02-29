import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  passwordResetExpires?: Date;
  passwordResetToken?: string;
  active: boolean;
  //TODo will fix this as reference
  //   location: mongoose.Schema.Types.ObjectId;
  region: string;
}

interface UserMethods {
  changedPasswordAfter(): boolean;
  createPasswordResetToken(): string;
}

type UserModel = Model<User, unknown, UserMethods>;

const UserSchema = new mongoose.Schema<User, UserModel, UserMethods>({
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
  region: {
    type: String,
    default: "yangon",
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

UserSchema.method(
  "changedPasswordAfter",
  function changedPasswordAfter(this: User, JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        (this.passwordChangedAt.getTime() / 1000).toString(),
        10,
      );

      return JWTTimestamp < changedTimestamp;
    }

    return false;
  },
);
UserSchema.method(
  "createPasswordResetToken",
  function createPasswordResetToken(this: User) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
  },
);

export default mongoose.model<User, UserModel>("User", UserSchema);
