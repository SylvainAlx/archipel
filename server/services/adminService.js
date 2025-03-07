import Nation from "../models/nationSchema.js";
import Place from "../models/placeSchema.js";
import { banIp } from "../services/userService.js";

export const modifierReportOuBan = async (
  AContent,
  AReportedStatus,
  ABanStatus,
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
        const error = new Error();
        error.code = 404;
        throw new Error(error);
    }

    const entite = await AModel.findOne({ officialId: AContent });
    if (!entite) {
      const error = new Error();
      error.code = 404;
      throw new Error(error);
    }

    if (AReportedStatus != null) {
      entite.reported = AReportedStatus;
      await entite.save();
    } else if (ABanStatus != null) {
      entite.banished = ABanStatus;
      await entite.save();
    }

    return entite;
  } catch (error) {
    throw error;
  }
};
