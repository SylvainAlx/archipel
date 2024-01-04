import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
      author: {
        type: String,
        required: true,
      },
      nationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nation",
      },
      message: String,
    },
    {
      timestamps: true,
    }
  );

  export default mongoose.model("Message", messageSchema);