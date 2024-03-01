import mongoose, { Document } from "mongoose";

export interface Seat extends Document {
  number: string;
  status: string;
  cost: number;
  venue: mongoose.Schema.Types.ObjectId;
  movieTime: mongoose.Schema.Types.ObjectId;
}

export enum SeatAvailability {
  empty = "empty",
  reserved = "reserved",
  locked = "locked",
}

const SeatSchema = new mongoose.Schema<Seat>({
  number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: SeatAvailability,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
  },
  // TODO will update movieTime just after the creation of movieTime.
  movieTime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MovieTime",
  },
});

export default mongoose.model<Seat>("Seat", SeatSchema);
