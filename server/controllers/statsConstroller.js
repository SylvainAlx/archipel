import Nation from "../models/nationSchema.js";
import User from "../models/userSchema.js";
import Place from "../models/placeSchema.js";
import Com from "../models/comSchema.js";
import { COMTYPE } from "../settings/const.js";
import { handleError } from "../utils/functions.js";

export const getCounts = async (req, res) => {
  try {
    const nations = await Nation.countDocuments({ banished: false });
    const citizens = await User.countDocuments({ banished: false });
    const places = await Place.countDocuments({ banished: false });
    const coms = await Com.countDocuments({
      banished: false,
      comType: { $in: [COMTYPE[3].id, COMTYPE[1].id] },
    });
    const counts = {
      nations,
      citizens,
      places,
      coms,
    };
    res.status(200).json(counts);
  } catch (error) {
    handleError(error, res);
  }
};
