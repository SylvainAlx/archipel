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
        map: {
          type: String,
          default: "",
        },
        website: {
          type: String,
          default: "",
          match: [
            /^https?:\/\/[^\s$.?#].[^\s]*$/,
            "Le champ 'website' doit être une URL valide.",
          ],
        },
        wiki: {
          type: String,
          default: "",
          match: [
            /^https?:\/\/([a-z]{2}\.)?wikipedia\.org\/wiki\/.+$/,
            "Le champ 'wiki' doit être une URL de page Wikipédia valide (par exemple : https://fr.wikipedia.org/wiki/).",
          ],
        },
        instagram: {
          type: String,
          default: "",
          match: [
            /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.-]+\/?$/,
            "Le champ 'instagram' doit être une URL de compte Instagram valide.",
          ],
        },
        discord: {
          type: String,
          default: "",
          match: [
            /^https?:\/\/(www\.)?discord\.gg\/[a-zA-Z0-9]+$/,
            "Le champ 'discord' doit être une URL de serveur Discord valide.",
          ],
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
          type: [String],
          default: [],
        },
        description: {
          type: String,
          default: "",
          maxlength: [5000, "Le texte ne peut pas dépasser 5000 caractères."],
        },
      },
      roleplay: {
        treasury: {
          type: Number,
          default: 0,
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
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Nation", nationSchema);
