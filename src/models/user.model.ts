import mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
  passwordResetExpires: Date;
  passwordResetToken: string;
  active: boolean;
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
  passwordConfirm: {
    type: String,
    required: true,
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

export default mongoose.model<User>("User", UserSchema);
