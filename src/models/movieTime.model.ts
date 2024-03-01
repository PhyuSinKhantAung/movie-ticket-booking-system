import mongoose, { Document } from "mongoose";

// [
//   {
//     movie: "spider",
//     start: "10:00",
//     end: "12:00",
//   },
//   {
//     movie: "spider",
//     start: "01:00",
//     end: "03:00",
//   },
//   {
//     movie: "spider",
//     start: "03:00",
//     end: "06:00",
//   },
//   {
//     movie: "stranger things",
//     start: "10:00",
//     end: "12:00",
//   },
//   {
//     movie: "stranger things",
//     start: "01:00",
//     end: "03:00",
//   },
//   {
//     movie: "stranger things",
//     start: "03:00",
//     end: "06:00",
//   },
// ];

//TODO will create movie time for each movie after creation of movie

export interface MovieTime extends Document {
  movie: mongoose.Schema.Types.ObjectId;
  start: Date;
  end: Date;
}

const MovieTimeSchema = new mongoose.Schema<MovieTime>(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
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
  {
    timestamps: true,
  },
);

export default mongoose.model<MovieTime>("MovieTime", MovieTimeSchema);
