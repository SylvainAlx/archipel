import mongoose from "mongoose";

const TagSchema = mongoose.Schema(
  {
    label: {
      fr: String,
      en: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Tag", TagSchema);
