import mongoose, { Mongoose } from "mongoose";

const workSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      description: String,
    },
    {
      timestamps: true,
    }
  );

  export default mongoose.model("Work", workSchema);