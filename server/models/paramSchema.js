import mongoose from "mongoose";

const ParamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  props: Array,
});

export default mongoose.model("Param", ParamSchema);
