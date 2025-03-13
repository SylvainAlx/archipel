import User from "../models/userSchema.js";
import Param from "../models/paramSchema.js";
import bip39 from "bip39";

export const getUserByName = async (name) => {
  try {
    const user = await User.findOne({ name });
    if (!user) {
      let error = new Error();
      error.code = 404;
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserByOfficialId = async (
  officialId,
  codeIfError,
  sensibleData = false,
) => {
  try {
    const user = await User.findOne(
      { officialId, banished: false },
      !sensibleData && "-password -recovery -ip",
    );
    if (!user) {
      let error = new Error();
      error.code = codeIfError;
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const getRecoveryWords = () => {
  const recovery = bip39.generateMnemonic();
  return recovery;
};

export const IpIsBanished = async (AUserIp) => {
  try {
    const banned =
      (await Param.findOne({
        name: "banished",
        props: { $elemMatch: { label: "ip", value: AUserIp } },
      })) != null;
    return banned;
  } catch (error) {
    throw error;
  }
};

export const updateUserIpAddress = async (user, ip) => {
  try {
    let isFind = false;
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
    throw error;
  }
};

export const verifyNationOwner = async (userId, nationId) => {
  const user = await User.findOne({
    officialId: userId,
    "citizenship.nationOwner": true,
    "citizenship.nationId": nationId,
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const banIp = async (AContent) => {
  try {
    const user = await User.findOne({ officialId: AContent });
    const lastIp = user.ip.reduce((APlusRecent, AElement) => {
      return new Date(AElement.lastVisit) > new Date(APlusRecent.lastVisit)
        ? AElement
        : APlusRecent;
    }, user.ip[0]);

    const banished = await Param.findOne({
      name: "banished",
    });
    if (banished) {
      banished.props.push({ label: "ip", value: lastIp.value });
      await banished.save();
    } else {
      const banishedParam = new Param({
        name: "banished",
        props: [{ label: "ip", value: lastIp.value }],
      });
      await banishedParam.save();
    }
  } catch (error) {
    throw error;
  }
};
