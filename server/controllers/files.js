import { deleteFile } from "../utils/functions.js";

export const deleteUploadedFile = async (req, res) => {
  try {
    const uuid = req.params.id;

    if (!uuid) {
      return res.status(400).json({ message: "[A TRADUIRE] UUID is required" });
    }

    if (await deleteFile(uuid).ok) {
      return res
        .status(200)
        .json({ statut: 200, message: "[A TRADUIRE] Suppression réussie" });
    } else {
      const errorResponse = await response.text(); // Lire la réponse en texte pour plus de détails
      return res.status(response.status).json({
        statut: 400,
        message: `[A TRADUIRE] Erreur: ${errorResponse}`,
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      statut: 400,
      message: `[A TRADUIRE] Erreur interne: ${error.message}`,
    });
  }
};
