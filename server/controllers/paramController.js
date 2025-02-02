import Param from "../models/paramSchema.js";
import { handleError } from "../utils/functions.js";

export const createParam = async (req, res) => {
  try {
    const { name, props } = req.body;
    const param = new Param({
      name,
      props,
    });
    param.save();
    res.status(201).json({ param, message: "paramètre créé" });
  } catch (error) {
    handleError(error, res);
  }
};

export const getParam = async (req, res) => {
  try {
    const param = await Param.findOne({ name: req.params.name });
    res.status(200).json({ param });
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllParams = async (req, res) => {
  try {
    const params = await Param.find();
    res.status(200).json(params);
  } catch (error) {
    handleError(error, res);
  }
};
