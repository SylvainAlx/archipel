import Nation from "../models/nationSchema.js";
import jwt from "jsonwebtoken";
import { LoremIpsum } from "lorem-ipsum";

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

    const role = name === process.env.ADMIN ? "admin" : "standard";

    const coords = {
      lat: (Math.random() * (90 - -90) + -90).toFixed(2),
      lng: (Math.random() * 360).toFixed(2),
    };
    let data = { general: coords };
    data.general.coords = coords;
    const nation = new Nation({ name, password, recovery, role, data });

    try {
      const savedNation = await nation.save();
      const jwt = savedNation.createJWT();
      res.status(201).json({ nation: savedNation, recovery, jwt });
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

    const nation = await Nation.findOne(
      { name },
      "_id name password role data createdAt"
    );
    if (!nation) {
      return res.status(404).json({ message: "Nation introuvable" });
    }
    nation.comparePassword(password, async (error, isMatch) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Erreur interne du serveur", erreur: error });
      }
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe invalide" });
      }
      const jwt = nation.createJWT();
      res.status(200).json({ nation, jwt });
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

    const nation = await Nation.findOne(
      { name: decoded.name },
      "_id name role data createdAt"
    );

    if (nation) {
      return res.status(200).json(nation);
    } else {
      return res.status(404).json({ message: "Nation introuvable" });
    }
  } catch (error) {
    res.status(401).json({ message: "JWT erroné", erreur: error });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { name, recovery, newPassword } = req.body;

    const nation = await Nation.findOne({ name });

    if (!nation) {
      return res.status(404).json({ message: "Nation inconnue" });
    }

    nation.compare(recovery, async (error, isMatch) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Erreur interne du serveur", erreur: error });
      }
      if (isMatch) {
        nation.password = newPassword;
        await nation.save();
        return res
          .status(200)
          .json({ message: "Nouveau mot de passe pris en compte" });
      } else {
        return res.status(401).json({ message: "Clé de récupération erronée" });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Impossible de récupérer la nation", erreur: error });
  }
};
