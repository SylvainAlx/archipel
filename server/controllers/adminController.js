import Com from "../models/comSchema.js";
import { COMTYPE } from "../settings/const.js";
import User from "../models/userSchema.js";
import { handleError } from "../utils/functions.js";
import { modifierReportOuBan } from "../services/adminService.js";

export const getAdminComs = async (req, res) => {
  try {
    const coms = await Com.find({ comType: COMTYPE[0].id });
    res.status(200).json(coms);
  } catch (error) {
    handleError(error, res);
  }
};

export const reportContent = (req, res) => {
  try {
    const AContent = req.params.id;
    modifierReportOuBan(AContent, true, null);
  } catch (error) {
    handleError(error, res);
  }
};

export const reverseReportContent = (req, res) => {
  try {
    const AContent = req.params.id;
    modifierReportOuBan(AContent, false, null);
  } catch (error) {
    handleError(error, res);
  }
};

export const banContent = async (req, res) => {
  try {
    const AContent = req.params.id;
    await modifierReportOuBan(AContent, null, true);
  } catch (error) {
    handleError(error, res);
  }
};

export const reverseBanContent = (req, res) => {
  try {
    const AContent = req.params.id;
    modifierReportOuBan(AContent, false, null);
  } catch (error) {
    handleError(error, res);
  }
};

export const getBannedUsers = async (req, res) => {
  try {
    const users = await User.find(
      { banished: true },
      "officialId name bio gender avatar language email link role plan expirationDate citizenship reported banished createdAt",
    );
    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};
