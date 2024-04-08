import mongoose from "mongoose";

const PlaceSchema = mongoose.Schema(
  {
    officialId: {
      type: String,
      required: true,
      unique: true,
    },
    nation: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    slots: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    population: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    builds: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Place", PlaceSchema);
