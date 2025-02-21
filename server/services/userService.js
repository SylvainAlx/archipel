import User from "../models/userSchema.js";
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
