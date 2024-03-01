import mongoose, { Document } from "mongoose";

export interface Venue extends Document {
  theatre: mongoose.Schema.Types.ObjectId;
  region: string;
  location: string;
}

const VenueSchema = new mongoose.Schema<Venue>({
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
    default: null,
  },

  region: String,

  location: String,
});

export default mongoose.model<Venue>("Venue", VenueSchema);