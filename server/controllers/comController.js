import Com from "../models/comSchema.js";
import { COMTYPE } from "../settings/const.js";
import { createOfficialId, handleError } from "../utils/functions.js";

export const comCount = async (req, res) => {
  try {
    const count = await Com.countDocuments({ comType: COMTYPE[3].id });
    res.status(200).json(count);
  } catch (error) {
    handleError(error, res);
  }
};

export const getDestinationComs = async (req, res) => {
  try {
    const destination = req.params.id;
    const coms = await Com.find({
      $or: [{ destination: destination }, { comType: COMTYPE[1].id }],
    });
    res.status(200).json(coms);
  } catch (error) {
    handleError(error, res);
  }
};

export const getComs = async (req, res) => {
  try {
    const originId = req.query.originId;
    const destinationId = req.query.destinationId;
    const comType = req.query.comType;

    // Si comType contient des virgules, on le découpe et on le transforme en tableau de nombres
    const comTypeArray = comType.includes(",")
      ? comType.split(",").map(Number)
      : [Number(comType)];

    // Construction de l'objet de filtre
    const filter = {
      destination: destinationId,
      comType: { $in: comTypeArray },
    };

    // Si originId n'est pas une chaîne vide, on ajoute ce filtre
    if (originId !== "") {
      filter.origin = originId;
    }

    // Exécution de la requête avec le filtre construit
    const coms = await Com.find(filter);

    // Retour des résultats
    res.status(200).json(coms);
  } catch (error) {
    handleError(error, res);
  }
};

export const getPublicComsByOrigin = async (req, res) => {
  try {
    const nationId = req.params.id;
    let coms = [];
    if (nationId) {
      coms = await Com.find({
        comType: COMTYPE[3].id,
        origin: nationId,
      }).sort({ createdAt: -1 });
    } else {
      coms = await Com.find({ comType: COMTYPE[3].id }).sort({ createdAt: -1 });
    }
    res.status(200).json(coms);
  } catch (error) {
    handleError(error, res);
  }
};

export const getPublicComs = async (req, res) => {
  try {
    const coms = await Com.find({
      comType: { $in: [COMTYPE[3].id, COMTYPE[1].id] },
    });
    res.status(200).json(coms);
  } catch (error) {
    handleError(error, res);
  }
};

export const createCom = async (req, res) => {
  try {
    const { origin, destination, title, comType, message } = req.body;
    const officialId = createOfficialId("m");
    const com = new Com({
      officialId,
      origin,
      destination,
      title,
      comType,
      message,
    });
    await com.save();
    res.status(201).json({ com, infoType: "201" });
  } catch (error) {
    handleError(error, res);
  }
};

export const readCom = async (req, res) => {
  try {
    const comId = req.query.id;
    const isRead = req.query.isread;
    const com = await Com.findById(comId);
    com.read = isRead;
    await com.save();
    res.status(200).json({ com, infoType: `update` });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteCom = async (req, res) => {
  try {
    const comId = req.params.id;
    Com.findByIdAndDelete(comId).then((com) => {
      res.status(200).json({
        com,
        infoType: `delete`,
      });
    });
  } catch (error) {
    handleError(error, res);
  }
};
