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
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Com", ComSchema);
