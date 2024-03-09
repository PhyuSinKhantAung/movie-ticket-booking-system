import mongoose, { Document } from "mongoose";

export interface Booking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  showtime: mongoose.Schema.Types.ObjectId; //**Warning will have to filter **//
  venue: mongoose.Schema.Types.ObjectId; //**Warning will have to filter **//
  seats: mongoose.Schema.Types.ObjectId[];
  status: string;
}

export const BOOKING_STATUS = ["pending", "reserved", "canceled"] as const;

const BookingSchema = new mongoose.Schema<Booking>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showtime",
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  },
  seats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: BOOKING_STATUS,
    default: "pending",
  },
});

export default mongoose.model<Booking>("Booking", BookingSchema);
