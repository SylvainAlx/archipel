import mongoose from "mongoose";

const ParamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  props: [{ label: String, value: mongoose.Schema.Types.Mixed }],
});

export default mongoose.model("Param", ParamSchema);
