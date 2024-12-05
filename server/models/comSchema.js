import mongoose from "mongoose";

const ComSchema = mongoose.Schema(
  {
    origin: {
      type: String,
      default: "",
    },
    destination: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    comType: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      default: "",
      maxlength: [500, "Le texte ne peut pas dépasser 500 caractères."],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Com", ComSchema);
