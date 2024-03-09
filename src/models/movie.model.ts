import mongoose, { Document } from "mongoose";

export interface Movie extends Document {
  theatre: mongoose.Schema.Types.ObjectId;
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
  isPublished?: boolean;
  year: string;
  director: string;
  plot: string;
  country: string;
}

const MovieSchema = new mongoose.Schema<Movie>(
  {
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },
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
    duration: {
      type: Number,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    releasedDate: Date,
    language: String,
    year: String,
    director: String,
    plot: String,
    country: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

export default mongoose.model<Movie>("Movie", MovieSchema);
