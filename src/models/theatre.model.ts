import mongoose, { Document } from "mongoose";

export interface Theatre extends Document {
  name: string;
  logo?: {
    url: string;
    public_id: string;
  };
}

const TheatreSchema = new mongoose.Schema<Theatre>(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Theatre>("Theatre", TheatreSchema);
