import mongoose, { Document } from "mongoose";

export interface Booking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  movieTime: mongoose.Schema.Types.ObjectId; //**Warning will have to filter **//
  status: string;
  venue: mongoose.Schema.Types.ObjectId; //**Warning will have to filter **//
  seats: mongoose.Schema.Types.ObjectId[];
}

export const BOOKING_STATUS = ["pending", "reserved", "canceled"];

const BookingSchema = new mongoose.Schema<Booking>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieTime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MovieTime",
  },
  status: {
    type: String,
    enum: BOOKING_STATUS,
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  },
  seats: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
});

export default mongoose.model<Booking>("Booking", BookingSchema);
