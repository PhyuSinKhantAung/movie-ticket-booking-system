import mongoose, { Document } from "mongoose";

export interface Showtime extends Document {
  theatre: mongoose.Schema.Types.ObjectId;
  venue: mongoose.Schema.Types.ObjectId;
  movie: mongoose.Schema.Types.ObjectId;
  start: Date;
  end: Date;
}

const ShowtimeSchema = new mongoose.Schema<Showtime>(
  {
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<Showtime>("Showtime", ShowtimeSchema);
