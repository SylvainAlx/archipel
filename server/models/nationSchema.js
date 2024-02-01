import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const nationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recovery: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    data: {
      url: {
        flag: {
          type: String,
          default: "",
        },
        banner: {
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
        nationalDay: Date,
        regime: {
          type: Number,
          default: 0,
        },
      },
      roleplay: {
        points: {
          type: Number,
          default: 0,
        },
        unusedPoints: {
          type: Number,
          default: 100,
        },
        politicalSide: {
          type: Number,
          default: 0,
        },
        pointsDistribution: {
          citizens: {
            type: Number,
            default: 0,
          },
          structures: {
            type: Number,
            default: 0,
          },
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

//cryptage du mot de passe  ou la clé de récupération avant chaque save qui modifie
nationSchema.pre("save", async function (next) {
  const nation = this;
  if (!nation.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

nationSchema.pre("save", async function (next) {
  const nation = this;
  if (!nation.isModified("recovery")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.recovery = await bcrypt.hash(this.recovery, salt);
});

//methode pour vérifier que le mot de passe ou la clé de récupération envoyés correspondent à ceux de la BDD
nationSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

nationSchema.methods.compare = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.recovery, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//création du JWT pour le login et le register
nationSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export default mongoose.model("Nation", nationSchema);
