import Citizen from "../models/citizenSchema.js";

export const getCitizens = async (req, res) => {
  try {
    const nationId = req.params.id;
    const citizens = await Citizen.find({ _id: nationId })
      .then((citizens) => {
        res.status(200).json(citizens);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
