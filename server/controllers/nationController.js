import Nation from "../models/nationSchema.js";
import User from "../models/userSchema.js";
import Place from "../models/placeSchema.js";
import { createOfficialId } from "../utils/functions.js";

export const nationsCount = async (req, res) => {
  try {
    Nation.countDocuments({})
      .then((count) => {
        res.status(200).json(count);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createNation = async (req, res) => {
  try {
    const { name, owner, motto, regime, currency, tags } = req.body;

    if (!name || !owner) {
      return res
        .status(400)
        .json({ message: "Certains champs sont manquants" });
    }

    if (owner != req.userId) {
      return res.status(403).json({ message: "Pas d'autorisation" });
    }

    const officialId = createOfficialId("n");

    let data = { roleplay: { citizens: 0 }, general: {} };
    data.general.motto = motto;
    data.general.regime = regime;
    data.general.currency = currency;
    data.general.tags = tags;
    data.roleplay.citizens += 1;
    const nation = new Nation({
      officialId,
      name,
      owner,
      data,
    });

    try {
      const savedNation = await nation.save();
      const user = await User.findOne({ officialId: owner });
      user.citizenship.status = 1;
      user.citizenship.nationId = savedNation.officialId;
      user.citizenship.nationName = savedNation.name;
      user.citizenship.nationOwner = true;
      const savedUser = await user.save();
      res.status(201).json({ nation: savedNation, user: savedUser });
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

export const getAllNations = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const nations = await Nation.find(
        { name: { $regex: searchText, $options: "i" } },
        "officialId name owner role data createdAt",
      );
      res.status(200).json(nations);
    } else {
      const nations = await Nation.find(
        {},
        "officialId name owner role data createdAt",
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
      "officialId name owner role data createdAt",
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
      "officialId name owner role data createdAt",
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
      "officialId name owner role data createdAt",
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
    const users = await User.find({ nation: nationId });
    const places = await Place.find({ nation: nationId });
    res.status(200).json({ users, places });
  } catch (error) {
    res.status(404).json({
      message: "données impossible à récupérer",
      erreur: error.message,
    });
  }
};

export const deleteSelfNation = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ officialId: userId });
    const nation = await Nation.findOneAndDelete({
      officialId: user.citizenship.nationId,
    });
    const places = await Place.deleteMany({ nation: nation.officialId });
    user.citizenship.nationId = "";
    user.citizenship.nationName = "";
    user.citizenship.nationOwner = false;
    const savedUser = await user.save();

    const update = {
      $set: {
        "citizenship.status": -1,
        "citizenship.nationId": "",
        "citizenship.nationName": "",
        "citizenship.nationOwner": false,
      },
    };

    const updatedUsers = await User.updateMany(
      { "citizenship.nationId": nation.officialId },
      update,
    );

    // await Com.deleteMany({ originId: id });
    res.status(200).json({
      message: `Votre nation a été supprimée`,
      user: savedUser,
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
    const user = await User.findOne({ "citizenship.nationId": nationId });
    user.citizenship.status = -1;
    user.citizenship.nationId = "";
    user.citizenship.nationName = "";
    user.citizenship.nationOwner = false;

    const update = {
      $set: {
        "citizenship.status": -1,
        "citizenship.nationId": "",
        "citizenship.nationName": "",
        "citizenship.nationOwner": false,
      },
    };

    const updatedUsers = await User.updateMany(
      { "citizenship.nationId": nation.officialId },
      update,
    );

    const savedUser = await user.save();
    const nation = await Nation.findByIdAndDelete(nationId);
    res.status(200).json({
      message: `nation supprimée`,
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
    const { officialId, name, owner, data } = req.body;
    if (req.userId === owner) {
      const nation = await Nation.findOne(
        { officialId },
        "officialId name owner role data createdAt",
      );
      nation.name = name;
      nation.data = data;
      nation
        .save()
        .then((nation) => {
          res.status(200).json({ nation, message: "mise à jour réussie" });
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

export const getTags = async (req, res) => {
  try {
    const tags = await Nation.aggregate([
      {
        // Extraire uniquement la propriété data.general.tags de chaque document
        $project: {
          tags: "$data.general.tags",
        },
      },
      {
        // Aplatir les tableaux de tags en un seul tableau
        $unwind: "$tags",
      },
      {
        // Regrouper tous les tags en un seul tableau
        $group: {
          _id: null,
          tousLesTags: { $addToSet: "$tags" },
        },
      },
      {
        // Optionnel: On peut aussi trier les tags (par exemple par ordre alphabétique)
        $sort: { tousLesTags: 1 },
      },
    ]);

    res.status(200).json(tags[0].tousLesTags);
  } catch (error) {
    res.status(400).json({ message: "aucuns tags", erreur: error.message });
  }
};
