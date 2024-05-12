import User from "../models/userSchema.js";
import Place from "../models/placeSchema.js";
import Nation from "../models/nationSchema.js";
import Param from "../models/paramSchema.js";
import Com from "../models/comSchema.js";
import jwt from "jsonwebtoken";
import { LoremIpsum } from "lorem-ipsum";
import { createOfficialId } from "../utils/functions.js";

export const register = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Certains champs sont manquants" });
    }

    const random = new LoremIpsum({
      sentencesPerParagraph: { max: 8, min: 4 },
      wordsPerSentence: { max: 16, min: 4 },
    });
    const recovery = random.generateWords(15);

    let role = "standard";

    const roles = await Param.findOne({ name: "role" });
    roles.props.forEach((prop) => {
      if (prop.value === "admin" && prop.label === name) {
        role = "admin";
      }
    });

    const officialId = createOfficialId("c");

    const user = new User({
      officialId,
      name,
      password,
      recovery,
      role,
    });

    try {
      const savedUser = await user.save();
      const jwt = savedUser.createJWT();
      res.status(201).json({ user: savedUser, recovery, jwt });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Informations déjà existantes dans la base de données",
          erreur: error.keyValue,
        });
      } else {
        return res.status(400).json({
          message: "Certaines informations sont erronées ou manquantes",
          error,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ erreur: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne(
      { name },
      "officialId name surname avatar password role citizenship createdAt",
    );
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    user.comparePassword(password, async (error, isMatch) => {
      if (error) {
        return res.status(500).json({
          message: "Erreur lors du décryptage du mot de passe",
          erreur: error,
        });
      }
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe invalide" });
      }
      const jwt = user.createJWT();
      res.status(200).json({ user, message: "bienvenue " + name, jwt });
    });
  } catch (error) {
    res.status(400).json({ message: "Connexion impossible", erreur: error });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, secret);

    const user = await User.findOne(
      { name: decoded.name },
      "officialId name surname avatar role citizenship createdAt",
    );

    if (user) {
      return res.status(200).json({ user, message: "bienvenue " + user.name });
    } else {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
  } catch (error) {
    res.status(401).json({ message: "JWT erroné", erreur: error });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { name, recovery, newPassword } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur inconnue" });
    }

    user.compare(recovery, async (error, isMatch) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Erreur interne du serveur", erreur: error });
      }
      if (isMatch) {
        user.password = newPassword;
        await user.save();
        return res
          .status(200)
          .json({ message: "Nouveau mot de passe pris en compte" });
      } else {
        return res.status(401).json({ message: "Clé de récupération erronée" });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Impossible de récupérer l'utilisateur",
      erreur: error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const users = await User.find(
        { name: { $regex: searchText, $options: "i" } },
        "officialId name surname avatar role citizenship createdAt",
      );
      res.status(200).json(users);
    } else {
      const users = await User.find(
        {},
        "officialId name surname avatar role citizenship createdAt",
      );
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(404).json({ message: "aucun utilisateur" });
  }
};

export const getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne(
      { officialId: userId },
      "officialId name surname avatar role citizenship createdAt",
    );
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({
      message: "aucun utilisateur à afficher",
      erreur: error.message,
    });
  }
};

export const getSelfUser = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findOne({ officialId: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({
      message: "utilisateur impossible à récupérer",
      erreur: error.message,
    });
  }
};

export const deleteSelfUser = async (req, res) => {
  try {
    const id = req.userId;
    User.findOneAndDelete({ officialId: id }).then(async (user) => {
      // await Place.deleteMany({ nation: id });
      const nation = await Nation.findOne({ owner: id });
      if (nation != null) {
        nation.owner = "";
        nation.save();
      }

      // await Com.deleteMany({ originId: id });
      res.status(200).json({
        message: `Utilisateur supprimé`,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "impossible de supprimer l'utilisateur",
      erreur: error.message,
    });
  }
};
