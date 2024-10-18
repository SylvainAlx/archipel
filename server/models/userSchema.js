import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema(
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
    surname: {
      type: String,
      default: "",
    },
    gender: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: "",
      unique: true,
    },
    language: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    recovery: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      unique: true,
    },
    link: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      required: true,
    },
    citizenship: {
      status: {
        type: Number,
        default: -1,
      },
      nationId: {
        type: String,
        default: "",
      },
      nationOwner: {
        type: Boolean,
        default: false,
      },
      residence: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

//cryptage du mot de passe  ou la clé de récupération avant chaque save qui modifie
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("recovery")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.recovery = await bcrypt.hash(this.recovery, salt);
});

//methode pour vérifier que le mot de passe ou la clé de récupération envoyés correspondent à ceux de la BDD
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.compare = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.recovery, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//création du JWT pour le login et le register
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this.officialId,
      name: this.name,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
