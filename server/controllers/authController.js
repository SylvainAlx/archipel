import Nation from "../models/nationSchema.js";
import jwt from "jsonwebtoken";
import { LoremIpsum } from "lorem-ipsum";

export const register = async (req, res) => {
  try {
    const { name, password } = req.body;

    const random = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });
    const recovery = random.generateWords(15)

    const nation = new Nation({
      name,
      password,
      recovery,
      role: name === process.env.ADMIN ? "admin" : "standard",
      data: {
        general: {
          points: 100
        }
      }
    });
    nation
      .save()
      .then((nation) => {
        const jwt = nation.createJWT();
        res.status(201).json({ nation, recovery, jwt });
      })

      .catch((error) => {
        if (error.code === 11000) {
          res.status(400).json({
            message: "informations déjà existantes dans la base de données",
            erreur: error.keyValue,
          });
        } else {
          res.status(400).json({
            message: `certaines informations sont erronées ou manquantes`,
          });
        }
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const nation = await Nation.findOne({ name })
      .then((nation) => {
        nation.comparePassword(password, async (error, isMatch) => {
          if (isMatch) {
            const jwt = nation.createJWT();
            res.status(200).json({ nation, jwt });
          } else {
            res.status(401).json({
              message: "mot de passe invalide",
            });
          }
        });
      })
      .catch((error) => {
        res.status(400).json({ message: "nation introuvable" });
      });
  } catch (error) {
    res.status(400).json({ message: "connexion impossible" });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const nation = await Nation.findOne({ name: decoded.name });
    res.status(200).json(nation);
  } catch (error) {
    res.status(401).json({ message: "JWT erroné" });
  }
};
