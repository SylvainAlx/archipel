import Nation from "../models/nationSchema.js";
import User from "../models/userSchema.js";
import Place from "../models/placeSchema.js";
import Tile from "../models/tileSchema.js";
import Relation from "../models/relationSchema.js";
import Com from "../models/comSchema.js";
import { createOfficialId, handleError } from "../utils/functions.js";
import { COMTYPE, DEFAULT_GIFTS } from "../settings/const.js";
import { getUserByOfficialId } from "../services/userService.js";
import {
  getGifts,
  getValueFromParam,
  payCreditsFromBank,
  recoverCreditToBank,
} from "../services/paramService.js";
import { deleteFile } from "../services/fileService.js";

export const nationsCount = async (req, res) => {
  try {
    const count = await Nation.countDocuments({ banished: false });
    res.status(200).json(count);
  } catch (error) {
    handleError(error, res);
  }
};

export const createNation = async (req, res) => {
  try {
    const {
      name,
      owner,
      motto,
      isNationState,
      regime,
      currency,
      nationalDay,
      tags,
    } = req.body;

    if (!name || !owner) {
      return res.status(400).json({ infoType: "400" });
    }
    if (owner != req.userId) {
      return res.status(403).json({ infoType: "403" });
    }
    const officialId = createOfficialId("n");
    const gift = getValueFromParam(
      await getGifts(),
      "newNation",
      DEFAULT_GIFTS.NEW_NATION,
    );
    let data = {
      roleplay: { citizens: 1, treasury: gift },
      general: {},
    };
    data.general.motto = motto;
    data.general.regime = regime;
    data.general.isNationState = isNationState;
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
      await payCreditsFromBank(gift);
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
          infoType: "400",
        });
      }
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllNations = async (req, res) => {
  try {
    const searchText = req.query.name;
    const searchTag = req.query.tag;
    if (searchText || searchTag) {
      const filter = { banished: false };
      if (searchText) {
        filter.name = { $regex: ".*" + searchText + ".*", $options: "i" };
      }
      if (searchTag) {
        filter["data.general.tags"] = {
          $regex: ".*" + searchTag + ".*",
          $options: "i",
        };
      }
      const nations = await Nation.find(
        filter,
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
      res.status(404).json({ infoType: "404" });
    }
  } catch (error) {
    handleError(error, res);
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
    handleError(error, res);
  }
};

export const getOneNation = async (req, res) => {
  const nationId = req.params.id;
  try {
    const nation = await Nation.findOne(
      { officialId: nationId, banished: false },
      "officialId name owner role reported banished data createdAt",
    );
    if (!nation) {
      let error = new Error();
      error.code = 404;
      throw error;
    }
    res.status(200).json(nation);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteSelfNation = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.userId;
    const user = await User.findOne({ officialId: userId });
    if (!password) {
      return res.status(400).json({ infoType: "400" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ infoType: "badPassword" });
    }

    // suppression de la nation
    const nation = await Nation.findOneAndDelete({
      officialId: user.citizenship.nationId,
    });
    await recoverCreditToBank(nation.data.roleplay.treasury);
    if (nation != null) {
      if (nation.data.roleplay.citizens > 1) {
        return res.status(403).json({ infoType: "403" });
      }
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

      // suppression des communications privées de la nation
      await Com.deleteMany({
        origin: nation.officialId,
        comType: COMTYPE[2].id,
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
    handleError(error, res);
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
      const savedNation = await nation.save();
      res.status(200).json({ nation: savedNation, infoType: "update" });
    } else {
      res.sendStatus(403).json({ infoType: "403" });
    }
  } catch (error) {
    handleError(error, res);
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
    handleError(error, res);
  }
};

export const transferCredits = async (req, res) => {
  try {
    const { nationOwnerId, recipientId, amount } = req.body;
    const userId = req.userId;
    if (userId != nationOwnerId) {
      return res
        .status(403)
        .json({ infoType: "403", message: "Transfert interdit" });
    }
    if (!recipientId || !amount || amount <= 0) {
      return res
        .status(400)
        .json({ infoType: "400", message: "Montant invalide" });
    }
    const nationOwner = await getUserByOfficialId(nationOwnerId, 404);
    const sender = await Nation.findOne({
      officialId: nationOwner.citizenship.nationId,
    });
    if (sender.data.roleplay.treasury < amount) {
      return res.status(403).json({
        infoType: "notEnoughCredits",
        message: "Crédits insuffisants",
      });
    }

    let recipientUser = null;
    let recipientNation = null;

    if (recipientId.charAt(2) === "n") {
      recipientNation = await Nation.findOne({ officialId: recipientId });
      if (!recipientNation) {
        return res
          .status(404)
          .json({ infoType: "404", message: "Nation introuvable" });
      }
      recipientNation.data.roleplay.treasury += amount;
    } else if (recipientId.charAt(2) === "c") {
      recipientUser = await getUserByOfficialId(recipientId, 404);
      recipientUser.credits += amount;
    } else {
      return res
        .status(400)
        .json({ infoType: "400", message: "ID de destinataire invalide" });
    }

    sender.data.roleplay.treasury -= amount;
    await sender.save();
    if (recipientUser) await recipientUser.save();
    if (recipientNation) await recipientNation.save();

    return res.status(200).json({
      sender,
      recipientUser: recipientUser || undefined,
      recipientNation: recipientNation || undefined,
      infoType: "transfer",
      message: "Transfert réussi",
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const giveOwnership = async (req, res) => {
  try {
    const { nationOfficialId, sellerOfficialId, buyerOfficialId, password } =
      req.body;
    if (req.userId === sellerOfficialId) {
      const seller = await User.findOne({ officialId: sellerOfficialId });
      if (!password) {
        return res.status(400).json({ infoType: "400" });
      }
      const isMatch = await seller.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ infoType: "badPassword" });
      }
      const buyer = await User.findOne({ officialId: buyerOfficialId });
      if (
        seller &&
        buyer &&
        seller.citizenship.nationId === nationOfficialId &&
        buyer.citizenship.nationId === nationOfficialId
      ) {
        seller.citizenship.nationOwner = false;
        await seller.save();
        buyer.citizenship.nationOwner = true;
        await buyer.save();
        const nation = await Nation.findOne(
          { officialId: nationOfficialId },
          "officialId name owner role reported banished data createdAt",
        );
        nation.owner = buyerOfficialId;
        await nation.save();
        res.status(200).json({
          seller,
          buyer,
          nation,
          infoType: "updateOnwership",
        });
      } else {
        return res.status(403).json({
          infoType: "403",
          message: "Vous ne pouvez pas acquérir l'héritage de cette nation",
        });
      }
    } else {
      res.sendStatus(403).json({ infoType: "403" });
    }
  } catch (error) {
    handleError(error, res);
  }
};
