import mongoose from "mongoose";

const PlaceSchema = mongoose.Schema(
  {
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nation",
      required: true,
    },
    buildDate: {
      type: Date,
      require: true,
    },
    type: {
      type: Number,
      required: true,
    },
    cost: {
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
