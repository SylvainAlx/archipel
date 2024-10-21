export const deleteUploadedFile = async (req, res) => {
  const uuid = req.params.id;

  if (!uuid) {
    return res.status(400).json({ message: "[A TRADUIRE] UUID is required" });
  }

  const authorization = `${process.env.UPLOADCARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`;

  try {
    const response = await fetch(
      `https://api.uploadcare.com/files/${uuid}/storage/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Uploadcare.Simple ${authorization}`,
          Accept: "application/vnd.uploadcare-v0.7+json",
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      return res
        .status(200)
        .json({ statut: 200, message: "[A TRADUIRE] Suppression réussie" });
    } else {
      const errorResponse = await response.text(); // Lire la réponse en texte pour plus de détails
      return res
        .status(response.status)
        .json({
          statut: 400,
          message: `[A TRADUIRE] Erreur: ${errorResponse}`,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        statut: 400,
        message: `[A TRADUIRE] Erreur interne: ${error.message}`,
      });
  }
};
