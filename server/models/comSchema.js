import mongoose from "mongoose";

const ComSchema = mongoose.Schema(
  {
    officialId: {
      type: String,
      required: true,
      unique: true,
    },
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
    read: {
      type: Boolean,
      default: false,
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

export default mongoose.model("Com", ComSchema);
