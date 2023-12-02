import Nation from "../models/nationSchema.js";

export const getAll = async (req, res) => {
  try {
    const nations = await Nation.find({}, "name data");
    res.status(200).json(nations);
  } catch (error) {
    res.status(400).json({ message: "aucune nations" });
  }
};

export const getOne = async (req, res) => {
  try {
    const nationId = req.params.id;
    const nation = await Nation.findOne({ _id: nationId });
    res.status(200).json({
      name: nation.name,
      data: nation.data,
    });
  } catch (error) {
    res.status(400).json({
      message: "aucune nation à afficher",
      erreur: error.message,
    });
  }
};

export const deleteSelf = async (req, res) => {
  try {
    const nationId = req.params.id;
    const id = req.nationId;
    if (nationId == id) {
      Nation.findByIdAndDelete(id).then((resp) => {
        res.status(200).json({
          message: `Votre compte a été supprimé`,
        });
      });
    } else {
      res.status(403).json({
        message: "suppression interdite",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "impossible de supprimer la nation",
      erreur: error.message,
    });
  }
};
