import Com from "../models/comSchema.js";
import { COMTYPE } from "../settings/const.js";
import Nation from "../models/nationSchema.js";
import User from "../models/userSchema.js";
import Place from "../models/placeSchema.js";

export const getAdminComs = async (req, res) => {
  try {
    const coms = await Com.find({ comType: COMTYPE[0].id });
    res.status(200).json(coms);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "400",
    });
  }
};

const modifierReportOuBan = async (
  AContent,
  AReportedStatus,
  ABanStatus,
  res,
) => {
  try {
    let AModel;
    let ATypeEntite;

    switch (AContent.charAt(2)) {
      case "n":
        AModel = Nation;
        ATypeEntite = "Nation";
        break;
      case "c":
        AModel = User;
        ATypeEntite = "Utilisateur";
        break;
      case "p":
        AModel = Place;
        ATypeEntite = "Lieu";
        break;
      default:
        return res.status(404).json({ message: "Type d'entité inconnu." });
    }

    const entite = await AModel.findOne({ officialId: AContent });
    if (!entite) {
      return res.status(404).json({ message: `${ATypeEntite} non trouvé.` });
    }

    if (AReportedStatus != null) {
      entite.reported = AReportedStatus;
      await entite.save();
    } else if (ABanStatus != null) {
      entite.banished = ABanStatus;
      await entite.save();
    }

    res.status(200).json(entite);
  } catch (error) {
    console.error(
      `Erreur lors de la modification du statut de ${ATypeEntite} :`,
      error,
    );
    res.status(500).json({
      message: `Erreur interne du serveur pour ${ATypeEntite}.`,
      error,
    });
  }
};

export const reportContent = (req, res) => {
  const AContent = req.params.id;
  modifierReportOuBan(AContent, true, null, res);
};

export const reverseReportContent = (req, res) => {
  const AContent = req.params.id;
  modifierReportOuBan(AContent, false, null, res);
};

export const banContent = (req, res) => {
  const AContent = req.params.id;
  modifierReportOuBan(AContent, null, true, res);
};

export const reverseBanContent = (req, res) => {
  const AContent = req.params.id;
  modifierReportOuBan(AContent, null, false, res);
};
