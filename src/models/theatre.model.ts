import mongoose, { Document } from "mongoose";

export interface Theatre extends Document {
  name: string;
  logo?: string;
}

const TheatreSchema = new mongoose.Schema<Theatre>(
  {
    name: {
      type: String,
      required: true,
    },
    logo: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Theatre>("Theatre", TheatreSchema);
