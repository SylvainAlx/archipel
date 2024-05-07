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
    owner: String,
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
        coords: {
          lat: {
            type: Number,
            required: true,
          },
          lng: {
            type: Number,
            required: true,
          },
        },
        motto: {
          type: String,
          default: "",
        },
        nationalDay: Date,
        regime: {
          type: Number,
          default: 0,
        },
      },
      roleplay: {
        lastUpdated: {
          type: Date,
          default: new Date(),
        },
        points: {
          type: Number,
          default: 0,
        },
        credits: {
          type: Number,
          default: 100,
        },
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
        politicalSide: {
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
