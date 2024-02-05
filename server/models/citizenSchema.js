import mongoose from "mongoose";

const CitizenSchema = mongoose.Schema(
  {
    nationality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nation",
      required: true,
    },
    name: {
      type: String,
      default: "no name",
    },
    surname: {
      type: String,
      default: "no surname",
    },
    image: {
      type: String,
      default: true,
    },
    role: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Citizen", CitizenSchema);
