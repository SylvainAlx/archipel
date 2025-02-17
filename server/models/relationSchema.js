import mongoose from "mongoose";

const RelationSchema = mongoose.Schema(
  {
    officialId: {
      type: String,
      default: "",
      unique: true,
    },
    name: {
      type: String,
      default: "",
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    nations: {
      type: [{ OfficialId: String, AmbassadorId: String, accepted: Boolean }],
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
