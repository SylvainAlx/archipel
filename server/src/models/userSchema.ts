import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface TypUser extends Document {
  officialId: string;
  name: string;
  surname?: string;
  gender?: number;
  avatar?: string;
  language?: string;
  password: string;
  recovery: string;
  role: string;
  citizenship: {
    status?: number;
    nationId?: string;
    nationOwner?: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<TypUser>(
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
UserSchema.methods.comparePassword = function (
  AcandidatePassword: string,
  Acb: (Aerr: Error | null, AisMatch: boolean) => void,
) {
  // Comparer le mot de passe candidat avec celui stocké dans la base de données
  bcrypt.compare(AcandidatePassword, this.password, (Aerr, AisMatch) => {
    if (Aerr) return Acb(Aerr, false); // Fournir les deux arguments ici
    Acb(null, AisMatch); // Fournir `null` pour l'erreur et `isMatch` comme deuxième argument
  });
};

UserSchema.methods.compare = function (
  AcandidatePassword: string,
  Acb: (Aerr: Error | null, AisMatch: boolean) => void,
) {
  // Comparer le mot de passe candidat avec le champ "recovery"
  bcrypt.compare(AcandidatePassword, this.recovery, (Aerr, AisMatch) => {
    if (Aerr) return Acb(Aerr, false); // Fournir les deux arguments en cas d'erreur
    Acb(null, AisMatch); // Passer `null` pour l'erreur et `AisMatch` pour le résultat
  });
};

//création du JWT pour le login et le register
UserSchema.methods.createJWT = function (): string {
  const Asecret = process.env.JWT_SECRET;

  if (!Asecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    {
      id: this.officialId,
      name: this.name,
      role: this.role,
    },
    Asecret, // Secret vérifié
    { expiresIn: "24h" },
  );
};

const User =
  mongoose.models.User || mongoose.model<TypUser>("User", UserSchema);

export default User;
