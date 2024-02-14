import mongoose from "mongoose";

const PlaceSchema = mongoose.Schema(
  {
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nation",
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Place", PlaceSchema);
