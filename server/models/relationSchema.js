import mongoose from "mongoose";

const RelationSchema = mongoose.Schema(
  {
    officialId: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
      unique: true,
    },
    nations: {
      type: Array,
      default: [],
    },
    kind: {
      business: {
        type: Boolean,
        default: false,
      },
      economic: {
        type: Boolean,
        default: false,
      },
      cultural: {
        type: Boolean,
        default: false,
      },
      scientific: {
        type: Boolean,
        default: false,
      },
      coop: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Relation", RelationSchema);
