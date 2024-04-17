import Nation from "../models/nationSchema.js";
import Citizen from "../models/citizenSchema.js";
import Place from "../models/placeSchema.js";
import Com from "../models/comSchema.js";

export const getAllNations = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const nations = await Nation.find(
        { name: { $regex: searchText, $options: "i" } },
        "officialId name role data createdAt",
      );
      res.status(200).json(nations);
    } else {
      const nations = await Nation.find(
        {},
        "officialId name role data createdAt",
      );
      res.status(200).json(nations);
    }
  } catch (error) {
    res.status(404).json({ message: "aucune nations" });
  }
};

export const getTop100Nations = async (req, res) => {
  try {
    const nations = await Nation.find(
      {},
      "officialId name role data createdAt",
    ).limit(100);
    res.status(200).json(nations);
  } catch (error) {
    res.status(404).json({ message: "Aucune nation trouvée" });
  }
};

export const getOneNation = async (req, res) => {
  const nationId = req.params.id;
  try {
    const nation = await Nation.findOne(
      { officialId: nationId },
      "officialId name role data createdAt",
    );
    res.status(200).json({
      nation,
    });
  } catch (error) {
    res.status(404).json({
      message: "aucune nation à afficher",
      erreur: error.message,
    });
  }
};

export const getSelfNation = async (req, res) => {
  const id = req.nationId;
  try {
    const nation = await Nation.findOne(
      { _id: id },
      "officialId name role data createdAt",
    );
    res.status(200).json({ nation });
  } catch (error) {
    res.status(404).json({
      message: "nation impossible à récupérer",
      erreur: error.message,
    });
  }
};

export const getRoleplayData = async (req, res) => {
  try {
    const nationId = req.params.id;
    const citizens = await Citizen.find({ nation: nationId });
    const places = await Place.find({ nation: nationId });
    res.status(200).json({ citizens, places });
  } catch (error) {
    res.status(404).json({
      message: "données impossible à récupérer",
      erreur: error.message,
    });
  }
};

export const deleteSelfNation = async (req, res) => {
  try {
    const id = req.nationId;
    Nation.findByIdAndDelete(id).then(async (resp) => {
      await Place.deleteMany({ nation: id });
      await Com.deleteMany({ originId: id });
      res.status(200).json({
        message: `Votre nation a été supprimée`,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "impossible de supprimer la nation",
      erreur: error.message,
    });
  }
};

export const deleteOneNation = async (req, res) => {
  try {
    const nationId = req.params.id;
    Nation.findByIdAndDelete(nationId).then((resp) => {
      res.status(200).json({
        message: `nation supprimée`,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "impossible de supprimer la nation",
      erreur: error.message,
    });
  }
};

export const updateNation = async (req, res) => {
  try {
    const { _id, name, data } = req.body;
    if (req.nationId === _id) {
      const nation = await Nation.findOne(
        { _id },
        "officialId name role data createdAt",
      );
      nation.name = name;
      nation.data = data;
      nation
        .save()
        .then((nation) => {
          const jwt = nation.createJWT();
          res.status(200).json({ nation, jwt, message: "mise à jour réussie" });
        })
        .catch((error) => {
          res.status(400).json({
            message: `certaines informations sont erronées ou manquantes`,
            erreur: error.message,
          });
        });
    } else {
      res.sendStatus(403).json({ message: "modification interdite" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
