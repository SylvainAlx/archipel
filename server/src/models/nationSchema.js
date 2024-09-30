import mongoose from "mongoose";

const nationSchema = mongoose.Schema(
  {
    officialId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: String,
      default: "",
    },
    reported: {
      type: Boolean,
      default: false,
    },
    banished: {
      type: Boolean,
      default: false,
    },
    data: {
      url: {
        flag: {
          type: String,
          default: "",
        },
        coatOfArms: {
          type: String,
          default: "",
        },
        website: {
          type: String,
          default: "",
        },
        wiki: {
          type: String,
          default: "",
        },
        instagram: {
          type: String,
          default: "",
        },
        discord: {
          type: String,
          default: "",
        },
      },
      general: {
        motto: {
          type: String,
          default: "",
        },
        nationalDay: {
          type: String,
          default: "",
        },
        regime: {
          type: Number,
          default: 0,
        },
        currency: {
          type: String,
          default: "",
        },
        tags: {
          type: Array,
          default: [],
        },
        description: {
          type: String,
          default: "",
        },
      },
      roleplay: {
        capital: {
          type: String,
          default: "",
        },
        citizens: {
          type: Number,
          default: 0,
        },
        places: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Nation", nationSchema);
