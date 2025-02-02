import { deleteFile, handleError } from "../utils/functions.js";

export const deleteUploadedFile = async (req, res) => {
  try {
    const uuid = req.params.id;

    if (!uuid) {
      return res.status(400).json({ infoType: "miss" });
    }
    const response = await deleteFile(uuid);
    if (response.ok) {
      return res.status(200).json({ statut: 200, infoType: "delete" });
    } else {
      const errorResponse = await response.text(); // Lire la réponse en texte pour plus de détails
      return res.status(response.status).json({
        statut: 400,
        message: errorResponse,
        infoType: "400",
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};
