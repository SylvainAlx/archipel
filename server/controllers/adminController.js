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

export const reportContent = async (req, res) => {
  try {
    const AContent = req.params.id;
    const content = await modifierReportOuBan(AContent, true, null);
    res.status(200).json(content);
  } catch (error) {
    handleError(error, res);
  }
};

export const reverseReportContent = async (req, res) => {
  try {
    const AContent = req.params.id;
    const content = await modifierReportOuBan(AContent, false, null);
    res.status(200).json(content);
  } catch (error) {
    handleError(error, res);
  }
};

export const banContent = async (req, res) => {
  try {
    const AContent = req.params.id;
    const content = await modifierReportOuBan(AContent, null, true);
    res.status(200).json(content);
  } catch (error) {
    handleError(error, res);
  }
};

export const reverseBanContent = async (req, res) => {
  try {
    const AContent = req.params.id;
    const content = await modifierReportOuBan(AContent, false, null);
    res.status(200).json(content);
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
