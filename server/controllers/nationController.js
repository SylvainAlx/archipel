import Nation from "../models/nationSchema.js";

export const getAll = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    const nations = await Nation.find(
      { name: { $regex: searchText, $options: "i" } },
      "name role data createdAt"
    );
    res.status(200).json(nations);
  } catch (error) {
    res.status(400).json({ message: "aucune nations" });
  }
};

export const getTop100 = async (req, res) => {
  try {
    const nations = await Nation.find({}, "name role data createdAt").limit(
      100
    );
    res.status(200).json(nations);
  } catch (error) {
    res.status(400).json({ message: "Aucune nation trouvée" });
  }
};

export const getOne = async (req, res) => {
  try {
    const nationId = req.params.id;
    const nation = await Nation.findOne(
      { _id: nationId },
      "name role data createdAt"
    );
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

export const getSelf = async (req, res) => {
  try {
    const id = req.nationId;
    const nation = await Nation.findOne(
      { _id: id },
      "name role data createdAt"
    );
    res.status(200).json({ nation });
  } catch (error) {
    res.status(400).json({
      message: "nation impossible à récupérer",
      erreur: error.message,
    });
  }
};

export const deleteSelf = async (req, res) => {
  try {
    const id = req.nationId;
    Nation.findByIdAndDelete(id).then((resp) => {
      res.status(200).json({
        message: `Votre nation a été supprimée`,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "impossible de supprimer la nation",
      erreur: error.message,
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const nationId = req.params.id;
    Nation.findByIdAndDelete(nationId).then((resp) => {
      res.status(200).json({
        message: `nation supprimée`,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "impossible de supprimer la nation",
      erreur: error.message,
    });
  }
};

export const updateNation = async (req, res) => {
  try {
    const { _id, name, data } = req.body;
    if (req.nationId === _id) {
      const nation = await Nation.findOne({ _id }, "name role data createdAt");
      nation.name = name;
      nation.data = data;
      nation
        .save()
        .then((nation) => {
          const jwt = nation.createJWT();
          res.status(200).json({ nation, jwt, message: "mise à jour réussie" });
        })
        .catch((error) => {
          res.status(400).json({
            message: `certaines informations sont erronées ou manquantes`,
            erreur: error.message,
          });
        });
    } else {
      res.sendStatus(403).json({ message: "modification interdite" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
