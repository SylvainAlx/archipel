import mongoose from "mongoose";

const StructureSchema = mongoose.Schema(
  {
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nation",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Structure", StructureSchema);
