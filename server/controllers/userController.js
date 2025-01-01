import User from "../models/userSchema.js";
import Nation from "../models/nationSchema.js";
import Param from "../models/paramSchema.js";
import Place from "../models/placeSchema.js";
import { LoremIpsum } from "lorem-ipsum";
import { addMonths, createOfficialId } from "../utils/functions.js";
import { GIFTS } from "../settings/const.js";

const IpIsBanished = async (AUserIp) => {
  const banned =
    (await Param.findOne({
      name: "banished",
      props: { $elemMatch: { label: "ip", value: AUserIp } },
    })) != null;

  return banned;
};

export const register = async (req, res) => {
  try {
    const { name, password, gender, language } = req.body;
    const userIp = req.clientIp;

    if (await IpIsBanished(userIp)) {
      return res.status(403).json({
        infoType: "ip",
      });
    }

    if (!name || !password) {
      return res.status(400).json({
        infoType: "miss",
      });
    }

    const random = new LoremIpsum({
      sentencesPerParagraph: { max: 8, min: 4 },
      wordsPerSentence: { max: 16, min: 4 },
    });
    const recovery = random.generateWords(12);

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
      credits: GIFTS.REGISTER,
    });

    try {
      const savedUser = await user.save();
      const jwt = savedUser.createJWT();
      res
        .status(201)
        .json({ user: savedUser, recovery, jwt, infoType: "signup" });
    } catch (error) {
      console.error(error);

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
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const userIp = req.clientIp;

    if (await IpIsBanished(userIp)) {
      return res.status(403).json({
        infoType: "ip",
      });
    }

    const { name, password } = req.body;

    const user = await User.findOne({ name }, "-ip -recovery");
    if (!user) {
      return res.status(404).json({ infoType: "user" });
    }
    user.comparePassword(password, async (error, isMatch) => {
      if (error) {
        return res.status(400).json({
          infoType: "400",
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
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const userIp = req.clientIp;
    if (await IpIsBanished(userIp)) {
      return res.status(403).json({
        infoType: "ip",
      });
    }
    const userId = req.userId;

    const user = await User.findOne(
      { officialId: userId },
      "-ip -password -recovery",
    );

    if (user) {
      updateUserIpAddress(user.officialId, userIp);
      return res.status(200).json({ user, infoType: "verify" });
    } else {
      return res.status(404).json({ infoType: "user" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message, infoType: "jwt" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { name, recovery, newPassword } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ infoType: "user" });
    }

    const isMatch = await user.compare(recovery);

    if (!isMatch) {
      return res.status(401).json({
        infoType: "badRecovery",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      infoType: "newPassword",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
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
        return res.status(500).json({ infoType: "500", error: error.message });
      }
      if (isMatch) {
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
          infoType: "newPassword",
        });
      } else {
        return res.status(403).json({
          infoType: "forbidden",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
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
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne(
      { officialId: userId, banished: false },
      "-ip -password -recovery",
    );
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const getSelfUser = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findOne({ officialId: id });
    res.status(200).json({ user }, "-ip -password -recovery");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const deleteSelfUser = async (req, res) => {
  try {
    const id = req.userId;
    const { password } = req.body;

    const user = await User.findOne({ officialId: id });
    if (!user) {
      return res.status(404).json({ infoType: "404" });
    }
    user.comparePassword(password, async (error, isMatch) => {
      if (error) {
        return res.status(500).json({ infoType: "500", error: error.message });
      }
      if (isMatch) {
        User.findOneAndDelete({ officialId: id }).then(async (user) => {
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
          res.status(200).json({ nation, infoType: "delete" });
        });
      } else {
        return res.status(403).json({
          infoType: "forbidden",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
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
        res.status(400).json({ message: error.message, infoType: "error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const usersCount = async (req, res) => {
  try {
    User.countDocuments({ banished: false })
      .then((count) => {
        res.status(200).json(count);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message, infoType: "error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
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
      const user = await User.findOne(
        { officialId },
        "-ip -password -recovery",
      );
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
      user
        .save()
        .then((user) => {
          res.status(200).json({
            user,
            place: newResidence,
            oldPlace: oldResidence,
            infoType: "update",
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(400).json({
            infoType: "miss",
          });
        });
    } else {
      res.status(403).json({
        infoType: "forbidden",
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

export const changeStatus = async (req, res) => {
  try {
    const { officialId, nationId, status } = req.body;

    if (req.userId === officialId || status != 0) {
      const user = await User.findOne(
        { officialId },
        "-ip -password -recovery",
      );

      const nation = await Nation.findOne({ officialId: nationId });

      if (status === 0 || status === 1) {
        user.citizenship.nationId = nation.officialId;
        user.citizenship.nationName = nation.name;
        if (status === 1) {
          nation.data.roleplay.citizens += 1;
          nation.data.roleplay.treasury += GIFTS.CITIZENSHIP;
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
          nation.data.roleplay.treasury -= GIFTS.CITIZENSHIP;
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
          res.status(200).json({
            user,
            nation,
            infoType: "update",
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(400).json({
            infoType: "miss",
          });
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

export const changePlan = async (req, res) => {
  try {
    const { officialId, plan, duration } = req.body;
    const user = await User.findOne({ officialId }, "-ip -password -recovery");
    if (user) {
      user.plan = plan;
      user.expirationDate = addMonths(duration);
      user.save();
      res.status(200).json({
        user,
        infoType: "update",
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

const updateUserIpAddress = async (userOfficialId, ip) => {
  try {
    let isFind = false;
    const user = await User.findOne(
      { officialId: userOfficialId },
      "-password -recovery",
    );
    for (const address of user.ip) {
      if (address.value === ip) {
        isFind = true;
        address.lastVisit = new Date();
      }
    }
    if (!isFind) {
      user.ip.push({ value: ip, lastVisit: new Date() });
    }
    await user.save();
  } catch (error) {
    console.error(error);
  }
};
