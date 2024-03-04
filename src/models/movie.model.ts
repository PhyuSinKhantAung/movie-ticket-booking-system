import mongoose, { Document } from "mongoose";

export interface Movie extends Document {
  title: string;
  image?: {
    url: string;
    public_id: string;
  };
  images?: {
    url: string;
    public_id: string;
  };
  genres: string[];
  releasedDate: Date;
  duration: number;
  language: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  isPublished?: boolean;
  year: string;
  director: string;
  plot: string;
  country: string;
  showtimes: string[];
}

const MovieSchema = new mongoose.Schema<Movie>(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      url: String,
      public_id: String,
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    genres: [
      {
        type: String,
        required: true,
      },
    ],
    releasedDate: {
      type: Date,
      // required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      // min: [1, "Rating must be above 1.0"],
      // max: [5, "Rating must be below 5.0"],
      // set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    showtimes: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

export default mongoose.model<Movie>("Movie", MovieSchema);
