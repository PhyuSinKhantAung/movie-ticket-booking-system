import mongoose, { Document } from "mongoose";

export interface Seat extends Document {
  number: string;
  type: string;
  status: string;
  price: number;
  showtime: mongoose.Schema.Types.ObjectId | string;
}

export enum SeatAvailability {
  empty = "empty",
  reserved = "reserved",
  locked = "locked",
}

export enum SeatTypes {
  single = "single",
  double = "double",
}

const SeatSchema = new mongoose.Schema<Seat>({
  type: {
    type: String,
    enum: SeatTypes,
    required: true,
    default: "single",
  },
  number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: SeatAvailability,
    required: true,
    default: "empty",
  },
  price: {
    type: Number,
    required: true,
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showtime",
  },
});

export default mongoose.model<Seat>("Seat", SeatSchema);
