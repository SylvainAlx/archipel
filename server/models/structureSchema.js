import mongoose from "mongoose";

const structureSchema = mongoose.Schema(
  {
    officialId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["association", "company", "NGO", "politicalParty"],
    },
    owner: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    members: {
      type: [String],
      default: [],
    },
    establishments: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      default: "",
      match: [
        /^https?:\/\/[^\s$.?#].[^\s]*$/,
        "Le champ doit être une URL valide.",
      ],
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

export default mongoose.model("Structure", structureSchema);
