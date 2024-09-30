import mongoose from "mongoose";

const ComSchema = mongoose.Schema(
  {
    originId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nation",
      required: true
    },
    originName: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    comType: {
      type: Number,
      required: true
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);



export default mongoose.model("Com", ComSchema);