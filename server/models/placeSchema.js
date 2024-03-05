import mongoose from "mongoose";

const PlaceSchema = mongoose.Schema(
  {
    nation: {
      type: String,
      required: true,
    },
    buildDate: {
      type: Date,
      require: true,
    },
    level: {
      type: Number,
      required: true,
    },
    slots: {
      type: Number,
      required: true,
    },
    builds: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Place", PlaceSchema);
