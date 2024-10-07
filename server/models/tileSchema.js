import mongoose from "mongoose";

const TileSchema = mongoose.Schema(
  {
    nationOfficialId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    value: {
      type: String || Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Tile", TileSchema);
