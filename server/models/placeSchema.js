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
    population: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: [2000, "Le texte ne peut pas dépasser 5000 caractères."],
    },
    image: {
      type: String,
      default: "",
    },
    reported: {
      type: Boolean,
      default: false,
    },
    banished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Place", PlaceSchema);
