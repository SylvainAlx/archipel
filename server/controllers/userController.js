import User from "../models/userSchema.js";
import Nation from "../models/nationSchema.js";
import Param from "../models/paramSchema.js";
import jwt from "jsonwebtoken";
import { LoremIpsum } from "lorem-ipsum";
import { createOfficialId } from "../utils/functions.js";

export const register = async (req, res) => {
  try {
    const { name, password, gender, language } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Certains champs sont manquants" });
    }

    const random = new LoremIpsum({
      sentencesPerParagraph: { max: 8, min: 4 },
      wordsPerSentence: { max: 16, min: 4 },
    });
    const recovery = random.generateWords(15);

    let role = "standard";

    const roles = await Param.findOne({ name: "role" });
    roles.props.forEach((prop) => {
      if (prop.value === "admin" && prop.label === name) {
        role = "admin";
      }
    });

    const officialId = createOfficialId("c");

    const user = new User({
      officialId,
      name,
      password,
      recovery,
      gender,
      language,
      role,
    });

    try {
      const savedUser = await user.save();
      const jwt = savedUser.createJWT();
      res
        .status(201)
        .json({ user: savedUser, recovery, jwt, infoType: "signup" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          error: error.keyValue,
          infoType: "11000",
        });
      } else {
        return res.status(400).json({
          error: error.message,
          infoType: "error",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message, infoType: "error" });
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne(
      { name },
      "officialId name surname gender avatar language password role citizenship createdAt",
    );
    if (!user) {
      return res.status(404).json({ infoType: "user" });
    }
    user.comparePassword(password, async (error, isMatch) => {
      if (error) {
        return res.status(400).json({
          infoType: "error",
          error: error.message,
        });
      }
      if (!isMatch) {
        return res.status(401).json({ infoType: "password" });
      }
      const jwt = user.createJWT();
      res.status(200).json({ user, jwt, infoType: "signin" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message, infoType: "error" });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, secret);

    const user = await User.findOne(
      { name: decoded.name },
      "officialId name surname gender avatar language role citizenship createdAt",
    );

    if (user) {
      return res.status(200).json({ user, infoType: "verify" });
    } else {
      return res.status(404).json({ infoType: "user" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message, infoType: "jwt" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { name, recovery, newPassword } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ infoType: "user" });
    }

    user.compare(recovery, async (error, isMatch) => {
      if (error) {
        return res
          .status(500)
          .json({ infoType: "serverError", error: error.message });
      }
      if (isMatch) {
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
          infoType: "newPassword",
        });
      } else {
        return res.status(401).json({
          infoType: "badRecovery",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      infoType: "error",
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userId;
    const user = await User.findOne({ officialId: userId });
    if (!user) {
      return res.status(404).json({ infoType: "user" });
    }
    user.comparePassword(oldPassword, async (error, isMatch) => {
      if (error) {
        return res
          .status(500)
          .json({ infoType: "serverError", error: error.message });
      }
      if (isMatch) {
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
          infoType: "newPassword",
        });
      } else {
        return res.status(401).json({
          infoType: "error",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      infoType: "error",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const users = await User.find(
        { name: { $regex: searchText, $options: "i" } },
        "officialId name surname gender avatar language role citizenship createdAt",
      );
      res.status(200).json(users);
    } else {
      const users = await User.find(
        {},
        "officialId name surname gender avatar language role citizenship createdAt",
      );
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(404).json({ error: error.message, infoType: "noUser" });
  }
};

export const getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne(
      { officialId: userId },
      "officialId name surname gender avatar language role citizenship createdAt",
    );
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({
      infoType: "noUser",
      error: error.message,
    });
  }
};

export const getSelfUser = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findOne({ officialId: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({
      infoType: "noUser",
      error: error.message,
    });
  }
};

export const deleteSelfUser = async (req, res) => {
  try {
    const id = req.userId;
    User.findOneAndDelete({ officialId: id }).then(async (user) => {
      // await Place.deleteMany({ nation: id });
      const nation = await Nation.findOne({ owner: id });
      if (nation != null) {
        nation.owner = "";
        nation.save();
      }

      // await Com.deleteMany({ originId: id });
      res.status(200).json({
        infoType: "delete",
      });
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      infoType: "deleteKO",
    });
  }
};

export const getUsersByNation = async (req, res) => {
  const nationId = req.params.id;
  try {
    const users = await User.find({ "citizenship.nationId": nationId })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const usersCount = async (req, res) => {
  try {
    User.countDocuments({})
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

export const updateUser = async (req, res) => {
  try {
    const { officialId, name, gender, avatar, language, role, citizenship } =
      req.body;
    if (req.userId === officialId) {
      const user = await User.findOne(
        { officialId },
        "officialId name surname gender avatar language role citizenship createdAt",
      );
      user.name = name;
      user.gender = gender;
      user.avatar = avatar;
      user.language = language;
      user.role = role;
      user.citizenship = citizenship;
      user
        .save()
        .then((user) => {
          res.status(200).json({ user, message: "mise à jour réussie" });
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

export const changeStatus = async (req, res) => {
  try {
    const { officialId, nationId, status } = req.body;
    if (req.userId === officialId || status != 0) {
      const user = await User.findOne(
        { officialId },
        "officialId nofficialIdame surname gender avatar language role citizenship createdAt",
      );
      
      const nation = await Nation.findOne(
        { officialId: nationId },
        "officialId name",
      );
      
      user.citizenship.status = status;
      if (status === 0 || status === 1) {
        user.citizenship.nationId = nation.officialId;
        user.citizenship.nationName = nation.name;
      } else {
        user.citizenship.nationId = "";
        user.citizenship.nationName = "";
      }

      user
        .save()
        .then((user) => {
          res.status(200).json({ user, message: "mise à jour réussie" });
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
