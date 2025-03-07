import User from "../models/userSchema.js";
import Nation from "../models/nationSchema.js";
import Param from "../models/paramSchema.js";
import Place from "../models/placeSchema.js";
import Com from "../models/comSchema.js";

import {
  addMonths,
  createOfficialId,
  handleError,
} from "../utils/functions.js";
import { COMTYPE, DEFAULT_GIFTS } from "../settings/const.js";
import {
  getUserByName,
  getRecoveryWords,
  getUserByOfficialId,
  IpIsBanished,
  updateUserIpAddress,
} from "../services/userService.js";
import {
  getGifts,
  getNationParam,
  getValueFromParam,
  payCreditsFromBank,
  recoverCreditToBank,
} from "../services/paramService.js";
import { deleteFile } from "../services/fileService.js";

export const register = async (req, res) => {
  try {
    const { name, password, gender, language } = req.body;
    const userIp = req.clientIp;
    const banned = await IpIsBanished(userIp);
    if (banned) {
      return res.status(403).json({ infoType: "ipbanned" });
    }
    if (!name || !password) {
      return res.status(401).json({
        infoType: "401",
      });
    }
    let role = "standard";
    const roles = await Param.findOne({ name: "role" });
    roles.props.forEach((prop) => {
      if (prop.value === "admin" && prop.label === name) {
        role = "admin";
      }
    });
    const recovery = getRecoveryWords();
    const gift = getValueFromParam(
      await getGifts(),
      "register",
      DEFAULT_GIFTS.REGISTER,
    );
    const user = new User({
      officialId: createOfficialId("c"),
      ip: [{ value: userIp, lastVisit: new Date() }],
      name,
      password,
      recovery,
      gender,
      language,
      role,
      credits: gift,
    });
    try {
      const savedUser = await user.save();
      await payCreditsFromBank(gift);
      const jwt = savedUser.createJWT();
      const { quotas, costs, gifts } = await getNationParam();
      res.status(201).json({
        user: savedUser,
        recovery,
        jwt,
        infoType: "signup",
        params: [quotas, costs, gifts],
      });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        return res.status(400).json({
          error: error.keyValue,
          infoType: "11000",
        });
      } else {
        handleError(error, res);
      }
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const login = async (req, res) => {
  try {
    const userIp = req.clientIp;
    const banned = await IpIsBanished(userIp);
    if (banned) {
      return res.status(403).json({ infoType: "ipbanned" });
    }
    const { name, password } = req.body;
    const user = await getUserByName(name);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ infoType: "badPassword" });
    }
    const jwt = user.createJWT();
    await updateUserIpAddress(user, userIp);
    const { quotas, costs, gifts } = await getNationParam();
    res
      .status(200)
      .json({ user, jwt, infoType: "signin", params: [quotas, costs, gifts] });
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json({ infoType: "badUser" });
    } else {
      handleError(error, res);
    }
  }
};

export const verify = async (req, res) => {
  try {
    const userIp = req.clientIp;
    const banned = await IpIsBanished(userIp);
    if (banned) {
      return res.status(403).json({ infoType: "ipbanned" });
    }
    const userId = req.userId;
    const user = await getUserByOfficialId(userId, 401, true);
    await updateUserIpAddress(user, userIp);
    const { quotas, costs, gifts } = await getNationParam();
    return res
      .status(200)
      .json({ user, infoType: "verify", params: [quotas, costs, gifts] });
  } catch (error) {
    handleError(error, res);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { name, recovery, newPassword } = req.body;

    const user = await getUserByName(name);

    const isMatch = await user.compareRecovery(recovery);

    if (!isMatch) {
      return res.status(401).json({ infoType: "badRecovery" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ infoType: "newPassword" });
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json({ infoType: "badUser" });
    } else {
      handleError(error, res);
    }
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userId;
    const user = await getUserByOfficialId(userId, 404, true);
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(403).json({ infoType: "badPassword" });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ infoType: "newPassword" });
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const users = await User.find(
        { name: { $regex: searchText, $options: "i" }, banished: false },
        "-ip -password -recovery",
      );
      res.status(200).json(users);
    } else {
      const users = await User.find(
        { banished: false },
        "-ip -password -recovery",
      );
      res.status(200).json(users);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserByOfficialId(userId, 404);
    res.status(200).json({
      user,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getSelfUser = async (req, res) => {
  const id = req.userId;
  try {
    const user = await getUserByOfficialId(id, 404, true);
    res.status(200).json({ user }, "-ip -password -recovery");
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteSelfUser = async (req, res) => {
  try {
    const id = req.userId;
    const { password } = req.body;

    const user = await getUserByOfficialId(id, 404, true);
    if (!user) {
      return res.status(404).json({ infoType: "404" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(403).json({ infoType: "403" });
    }

    // Sauvegarder l'ID de la nation avant de supprimer l'utilisateur
    const nationId = user.citizenship?.nationId;

    // Mise à jour de la nation si l'utilisateur en faisait partie
    if (nationId) {
      const nation = await Nation.findOne({ officialId: nationId });
      if (nation) {
        if (nation.owner === id) {
          return res.status(401).json({ infoType: "401" });
        }
        nation.data.roleplay.citizens = Math.max(
          0,
          nation.data.roleplay.citizens - 1,
        );
        await nation.save();
      }
    }

    // Suppression de l'utilisateur
    const deletedUser = await User.findOneAndDelete({ officialId: id });
    if (!deletedUser) {
      return res.status(500).json({ infoType: "500" });
    }
    // suppression des images uploadées pour la nation
    if (deletedUser.avatar != "") {
      const uuid = deletedUser.avatar.replace("https://ucarecdn.com/", "");
      await deleteFile(uuid);
    }
    // suppression des communications privées de l'utilisateur
    await Com.deleteMany({
      origin: deletedUser.officialId,
      comType: COMTYPE[6].id,
    });
    await Com.deleteMany({
      destination: deletedUser.officialId,
    });

    await recoverCreditToBank(deletedUser.credits);

    return res.status(200).json({ infoType: "delete" });
  } catch (error) {
    handleError(error, res);
  }
};

export const getUsersByNation = async (req, res) => {
  const nationId = req.params.id;
  try {
    await User.find(
      { "citizenship.nationId": nationId, banished: false },
      "-ip -password -recovery",
    )
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message, infoType: "400" });
      });
  } catch (error) {
    handleError(error, res);
  }
};

export const usersCount = async (req, res) => {
  try {
    User.countDocuments({ banished: false })
      .then((count) => {
        res.status(200).json(count);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message, infoType: "400" });
      });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      officialId,
      name,
      bio,
      gender,
      avatar,
      language,
      religion,
      email,
      link,
      role,
      plan,
      citizenship,
    } = req.body;

    if (req.userId === officialId) {
      const user = await getUserByOfficialId(officialId, 404);
      let newResidence;
      let oldResidence;
      if (user.citizenship.residence != citizenship.residence) {
        oldResidence = await Place.findOne({
          officialId: user.citizenship.residence,
        });
        if (oldResidence && oldResidence.population > 0) {
          oldResidence.population -= 1;
          await oldResidence.save();
        }
        newResidence = await Place.findOne({
          officialId: citizenship.residence,
        });

        if (newResidence) {
          newResidence.population += 1;
          await newResidence.save();
        } else {
          newResidence = null;
        }
      } else {
        newResidence = null;
        oldResidence = null;
      }

      user.name = name;
      (user.bio = bio), (user.gender = gender);
      user.avatar = avatar;
      user.language = language;
      user.religion = religion;
      user.email = email;
      user.link = link;
      user.role = role;
      user.plan = plan;
      user.citizenship = citizenship;
      await user.save();
      res.status(200).json({
        user,
        place: newResidence,
        oldPlace: oldResidence,
        infoType: "update",
      });
    } else {
      res.status(403).json({
        infoType: "403",
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { officialId, nationId, status } = req.body;

    if (req.userId === officialId || status != 0) {
      const user = await getUserByOfficialId(officialId, 404);
      const nation = await Nation.findOne({ officialId: nationId });
      const gift = getValueFromParam(
        await getGifts(),
        "citizenship",
        DEFAULT_GIFTS.CITIZENSHIP,
      );
      if (status === 0 || status === 1) {
        user.citizenship.nationId = nation.officialId;
        user.citizenship.nationName = nation.name;
        if (status === 1) {
          nation.data.roleplay.citizens += 1;
          nation.data.roleplay.treasury += gift;
          await nation.save();
          await payCreditsFromBank(gift);
        }
      } else {
        user.citizenship.nationId = "";
        user.citizenship.nationName = "";
        if (user.citizenship.status === 1) {
          nation.data.roleplay.citizens -= 1;
          nation.data.roleplay.treasury -= gift;
          await nation.save();
          await recoverCreditToBank(gift);
        }
      }
      user.citizenship.status = status;
      await user.save();
      res.status(200).json({
        user,
        nation,
        infoType: "update",
      });
    } else {
      res.sendStatus(403).json({ infoType: "403" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const changePlan = async (req, res) => {
  try {
    const { officialId, plan, duration } = req.body;
    const user = await getUserByOfficialId(officialId, 404);
    if (user) {
      user.plan = plan;
      user.expirationDate = addMonths(duration);
      await user.save();
      res.status(200).json({
        user,
        infoType: "update",
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const transferCredits = async (req, res) => {
  try {
    const { recipientId, amount } = req.body;

    if (!recipientId || !amount || amount <= 0) {
      return res
        .status(400)
        .json({ infoType: "400", message: "Montant invalide" });
    }

    const sender = await getUserByOfficialId(req.userId, 404);
    if (sender.credits < amount) {
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

    sender.credits -= amount;
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

export const createNewRecovery = async (req, res) => {
  try {
    const id = req.userId;
    const { password } = req.body;

    const user = await getUserByOfficialId(id, 404, true);
    if (!user) {
      return res.status(404).json({ infoType: "404" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(403).json({ infoType: "403" });
    }
    const newRecovery = getRecoveryWords();
    user.recovery = newRecovery;
    await user.save();
    res.status(200).json({ newRecovery, infoType: "200" });
  } catch (error) {
    handleError(error, res);
  }
};
