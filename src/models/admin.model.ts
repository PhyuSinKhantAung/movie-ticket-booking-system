import mongoose from "mongoose";

export interface Admin {
  name: string;
  email: string;
  password: string;
  role: string;
  //TODO will fix soon
  //   theatre_id: string;
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
    required: true,
  },
  //TODO will fix soon
  //     theatre_id: {

  //   }
});

export default mongoose.model<Admin>("Admin", AdminSchema);
