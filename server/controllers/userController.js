import User from "../models/userSchema.js";
import Nation from "../models/nationSchema.js";
import Param from "../models/paramSchema.js";
import jwt from "jsonwebtoken";
import { LoremIpsum } from "lorem-ipsum";
import { createOfficialId } from "../utils/functions.js";

export const register = async (req, res) => {
  try {
    const { name, password, gender, language } = req.body;
    const userIp = req.clientIp;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "[A TRADUIRE] Certains champs sont manquants" });
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
      ip: [{ value: userIp, lastVisit: new Date() }],
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
    const userIp = req.clientIp;
    const { name, password } = req.body;

    const user = await User.findOne(
      { name },
      "officialId name surname gender avatar language password email link role citizenship createdAt",
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
      updateUserIpAddress(user.officialId, userIp);
      res.status(200).json({ user, jwt, infoType: "signin" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message, infoType: "error" });
  }
};

export const verify = async (req, res) => {
  try {
    const userIp = req.clientIp;

    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, secret);

    const user = await User.findOne(
      { name: decoded.name },
      "officialId name surname gender avatar language email link role citizenship createdAt",
    );

    if (user) {
      updateUserIpAddress(user.officialId, userIp);
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
        "officialId name surname gender avatar language email link role citizenship createdAt",
      );
      res.status(200).json(users);
    } else {
      const users = await User.find(
        {},
        "officialId name surname gender avatar language email link role citizenship createdAt",
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
      "officialId name surname gender avatar language email link role citizenship createdAt",
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
      const nation = await Nation.findOne({
        officialId: user.citizenship.nationId,
      });
      if (nation != null) {
        if (nation.owner === user.officialId) {
          nation.owner = "";
        }
        nation.data.roleplay.citizens -= 1;
        nation.save();
      }

      // await Com.deleteMany({ originId: id });
      res.status(200).json({ nation, infoType: "delete" });
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
    const {
      officialId,
      name,
      gender,
      avatar,
      language,
      email,
      link,
      role,
      citizenship,
    } = req.body;
    if (req.userId === officialId) {
      const user = await User.findOne(
        { officialId },
        "officialId name surname gender avatar language email link role citizenship createdAt",
      );
      user.name = name;
      user.gender = gender;
      user.avatar = avatar;
      user.language = language;
      user.email = email;
      user.link = link;
      user.role = role;
      user.citizenship = citizenship;
      user
        .save()
        .then((user) => {
          res
            .status(200)
            .json({ user, message: "[A TRADUIRE] mise à jour réussie" });
        })
        .catch((error) => {
          res.status(400).json({
            message: `[A TRADUIRE] certaines informations sont erronées ou manquantes`,
            erreur: error.message,
          });
        });
    } else {
      res
        .sendStatus(403)
        .json({ message: "[A TRADUIRE] modification interdite" });
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
        "officialId nofficialIdame surname gender avatar language email link role citizenship createdAt",
      );

      const nation = await Nation.findOne(
        { officialId: nationId },
        "officialId name data",
      );

      if (status === 0 || status === 1) {
        user.citizenship.nationId = nation.officialId;
        user.citizenship.nationName = nation.name;
        if (status === 1) {
          nation.data.roleplay.citizens += 1;
          nation.save().catch((error) => {
            res.status(400).json({
              erreur: error.message,
            });
          });
        }
      } else {
        user.citizenship.nationId = "";
        user.citizenship.nationName = "";
        if (user.citizenship.status === 1) {
          nation.data.roleplay.citizens -= 1;
          nation.save().catch((error) => {
            res.status(400).json({
              erreur: error.message,
            });
          });
        }
      }
      user.citizenship.status = status;
      user
        .save()
        .then((user) => {
          res
            .status(200)
            .json({
              user,
              nation,
              message: "[A TRADUIRE] mise à jour réussie",
            });
        })
        .catch((error) => {
          res.status(400).json({
            message: `[A TRADUIRE] certaines informations sont erronées ou manquantes`,
            erreur: error.message,
          });
        });
    } else {
      res
        .sendStatus(403)
        .json({ message: "[A TRADUIRE] modification interdite" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateUserIpAddress = async (userOfficialId, ip) => {
  try {
    let isFind = false;
    const user = await User.findOne({ officialId: userOfficialId });
    for (const address of user.ip) {
      if (address.value === ip) {
        isFind = true;
        address.lastVisit = new Date();
      }
    }
    if (!isFind) {
      user.ip.push({ value: ip, lastVisit: new Date() });
    }
    const updatedUser = await user.save();
  } catch (error) {
    console.error(error);
  }
};
