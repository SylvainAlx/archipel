import Com from "../models/comSchema.js";
import { COMTYPE } from "../settings/const.js";
import Nation from "../models/nationSchema.js";
import User from "../models/userSchema.js";
import Place from "../models/placeSchema.js";
import Param from "../models/paramSchema.js";
import { handleError } from "../utils/functions.js";

export const getAdminComs = async (req, res) => {
  try {
    const coms = await Com.find({ comType: COMTYPE[0].id });
    res.status(200).json(coms);
  } catch (error) {
    handleError(error, res);
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

    switch (AContent.charAt(2)) {
      case "n":
        AModel = Nation;
        break;
      case "c":
        AModel = User;
        ABanStatus && banIp(AContent);
        break;
      case "p":
        AModel = Place;
        break;
      case "m":
        AModel = Com;
        break;
      default:
        return res.status(404).json({ message: "Type d'entité inconnu." });
    }

    const entite = await AModel.findOne({ officialId: AContent });
    if (!entite) {
      return res.status(404).json({ message: `Entité non trouvé.` });
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
    handleError(error, res);
  }
};

const banIp = async (AContent) => {
  try {
    const user = await User.findOne({ officialId: AContent });
    const lastIp = user.ip.reduce((APlusRecent, AElement) => {
      return new Date(AElement.lastVisit) > new Date(APlusRecent.lastVisit)
        ? AElement
        : APlusRecent;
    }, user.ip[0]);

    const banished = await Param.findOne({
      name: "banished",
    });
    if (banished) {
      banished.props.push({ label: "ip", value: lastIp.value });
      await banished.save();
    } else {
      const banishedParam = new Param({
        name: "banished",
        props: [{ label: "ip", value: lastIp.value }],
      });
      await banishedParam.save();
    }
  } catch (error) {
    handleError(error, res);
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

export const banContent = async (req, res) => {
  try {
    const AContent = req.params.id;
    await modifierReportOuBan(AContent, null, true, res);
  } catch (error) {
    handleError(error, res);
  }
};

export const reverseBanContent = (req, res) => {
  const AContent = req.params.id;
  modifierReportOuBan(AContent, null, false, res);
};

export const getBannedUsers = async (req, res) => {
  try {
    const users = await User.find(
      { banished: true },
      "officialId name bio gender avatar language email link role plan expirationDate citizenship reported banished createdAt",
    );
    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};
