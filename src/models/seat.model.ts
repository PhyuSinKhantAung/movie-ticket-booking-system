import mongoose, { Document } from "mongoose";

export interface Seat extends Document {
  venue: mongoose.Schema.Types.ObjectId;
  row: string;
  column: number;
  number: string;
  type: string;
  status: string;
  price: number;
  date: Date;
  showtime: string;
}

export enum SeatAvailability {
  empty = "empty",
  reserved = "reserved",
  locked = "locked",
}

const SeatSchema = new mongoose.Schema<Seat>({
  row: {
    type: String,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: SeatAvailability,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  },
});

export default mongoose.model<Seat>("Seat", SeatSchema);
