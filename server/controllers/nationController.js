import Nation from "../models/nationSchema.js";
import User from "../models/userSchema.js";
import Place from "../models/placeSchema.js";
import Tile from "../models/tileSchema.js";
import Relation from "../models/relationSchema.js";
import { createOfficialId, deleteFile } from "../utils/functions.js";

export const nationsCount = async (req, res) => {
  try {
    Nation.countDocuments({ banished: false })
      .then((count) => {
        res.status(200).json(count);
      })
      .catch((error) => {
        console.error(error.message);
        res.status(400).json({ infoType: "serverError" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const createNation = async (req, res) => {
  try {
    const { name, owner, motto, regime, currency, nationalDay, tags } =
      req.body;

    if (!name || !owner) {
      return res.status(400).json({ infoType: "miss" });
    }

    if (owner != req.userId) {
      return res.status(403).json({ infoType: "forbidden" });
    }

    const officialId = createOfficialId("n");

    let data = { roleplay: { citizens: 1, treasury: 10 }, general: {} };
    data.general.motto = motto;
    data.general.regime = regime;
    data.general.currency = currency;
    data.general.nationalDay = nationalDay;
    data.general.tags = tags;
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
      res
        .status(201)
        .json({ nation: savedNation, user: savedUser, infoType: "new" });
    } catch (error) {
      if (error.code === 11000) {
        console.error(error.message, error.keyValue);
        return res.status(400).json({
          infoType: "11000",
        });
      } else {
        console.error(error.message);
        return res.status(400).json({
          infoType: "miss",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const getAllNations = async (req, res) => {
  try {
    const searchText = req.query.name;
    const searchTag = req.query.tag;
    if (searchText || searchTag) {
      const nations = await Nation.find(
        {
          name: { $regex: searchText, $options: "i" },
          "data.general.tags": { $regex: searchTag, $options: "i" },
          banished: false,
        },
        "officialId name owner role reported banished data createdAt",
      );
      res.status(200).json(nations);
    } else if (searchText === "" && searchTag === "") {
      const nations = await Nation.find(
        { banished: false },
        "officialId name owner role reported banished data createdAt",
      );
      res.status(200).json(nations);
    } else {
      console.error(error);
      res.status(404).json({ infoType: "404" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const getTop100Nations = async (req, res) => {
  try {
    const nations = await Nation.find(
      { banished: false },
      "officialId name owner role reported banished data createdAt",
    ).limit(100);
    res.status(200).json(nations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const getOneNation = async (req, res) => {
  const nationId = req.params.id;
  try {
    const nation = await Nation.findOne(
      { officialId: nationId, banished: false },
      "officialId name owner role reported banished data createdAt",
    );
    res.status(200).json(nation);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const deleteSelfNation = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ officialId: userId });

    // suppression de la nation
    const nation = await Nation.findOneAndDelete({
      officialId: user.citizenship.nationId,
    });
    if (nation != null) {
      // suppression des images uploadées pour la nation
      if (nation.data.url.flag != "") {
        const uuid = nation.data.url.flag.replace("https://ucarecdn.com/", "");
        await deleteFile(uuid);
      }
      if (nation.data.url.coatOfArms != "") {
        const uuid = nation.data.url.coatOfArms.replace(
          "https://ucarecdn.com/",
          "",
        );
        await deleteFile(uuid);
      }
      if (nation.data.url.map != "") {
        const uuid = nation.data.url.map.replace("https://ucarecdn.com/", "");
        await deleteFile(uuid);
      }

      // suppression des images uploadées pour les lieux
      const places = await Place.find({ nation: nation.officialId });
      places.forEach((place) => {
        if (place.image != "") {
          const uuid = place.image.replace("https://ucarecdn.com/", "");
          deleteFile(uuid);
        }
      });

      // suppression des lieux de la nation
      await Place.deleteMany({ nation: nation.officialId });

      // suppression de l'appartenance à la nation pour le gérant
      user.citizenship.nationId = "";
      user.citizenship.nationName = "";
      user.citizenship.nationOwner = false;
      user.citizenship.status = -1;
      const savedUser = await user.save();

      // suppression de l'appartenance à la nation pour tous les citoyens
      const update = {
        $set: {
          "citizenship.status": -1,
          "citizenship.nationId": "",
          "citizenship.nationName": "",
          "citizenship.nationOwner": false,
        },
      };
      await User.updateMany(
        { "citizenship.nationId": nation.officialId },
        update,
      );

      // suppression des tuiles libres de la nation
      await Tile.deleteMany({
        nationOfficialId: nation.officialId,
      });

      // retrait de la nation des relations liées
      await Relation.updateMany(
        {
          "nations.OfficialId": nation.officialId, // Filtrer les documents où "OfficialId" est présent dans le tableau "nations"
        },
        {
          $pull: {
            nations: { OfficialId: nation.officialId }, // Retirer les objets dans "nations" où "OfficialId" correspond
          },
        },
      );

      res.status(200).json({
        infoType: "delete",
        user: savedUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const updateNation = async (req, res) => {
  try {
    const { officialId, name, owner, data } = req.body;
    if (req.userId === owner) {
      const nation = await Nation.findOne(
        { officialId },
        "officialId name owner role reported banished data createdAt",
      );
      nation.name = name;
      nation.data = data;
      nation
        .save()
        .then((nation) => {
          res.status(200).json({ nation, infoType: "update" });
        })
        .catch((error) => {
          console.error(error);
          res.status(400).json({ infoType: "miss" });
        });
    } else {
      res.sendStatus(403).json({ infoType: "forbidden" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Nation.aggregate([
      {
        $match: {
          banished: false,
        },
      },
      {
        $project: {
          tags: "$data.general.tags",
        },
      },
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          occurrence: { $sum: 1 },
        },
      },
      {
        $sort: { occurrence: -1 },
      },
    ]);
    res.status(200).json(tags.length > 0 ? tags : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};
