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
          unique: true,
        },
        coatOfArms: {
          type: String,
          default: "",
          unique: true,
        },
        map: {
          type: String,
          default: "",
          unique: true,
        },
        website: {
          type: String,
          default: "",
          unique: true,
        },
        wiki: {
          type: String,
          default: "",
          unique: true,
        },
        instagram: {
          type: String,
          default: "",
          unique: true,
        },
        discord: {
          type: String,
          default: "",
          unique: true,
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
