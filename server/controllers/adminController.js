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

export const reportContent = async (req, res) => {
  try {
    const content = req.params.id;
    console.log(content);

    switch (content.charAt(2)) {
      case "n":
        let nation = await Nation.findOne({ officialId: content });
        nation.reported = true;
        nation = await nation.save();
        res.status(200).json(nation);
        break;
      case "c":
        let user = await User.findOne({ officialId: content });
        user.reported = true;
        user = await user.save();
        res.status(200).json(user);
        break;
      case "p":
        let place = await Place.findOne({ officialId: content });
        place.reported = true;
        place = await place.save();
        res.status(200).json(place);
        break;
      default:
        res.status(404);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
