import Work from "../models/workSchema.js";

export const getAll = async (req, res) => {
    try {
      const works = await Work.find();
      res.status(200).json(works);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };