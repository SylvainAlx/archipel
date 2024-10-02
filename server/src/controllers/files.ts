import { Request, Response } from "express";

export const deleteUploadedFile = async (req: Request, res: Response) => {
  const uuid = req.params.id;

  if (!uuid) {
    res.status(400).json({ message: "UUID is required" });
  }

  const authorization = `${process.env.UPLOADCARE_PUBLIC_KEY as string}:${
    process.env.UPLOADCARE_SECRET_KEY
  }`;

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
      res.status(200).json({ statut: 200, message: "Suppression réussie" });
    } else {
      const errorResponse = await response.text(); // Lire la réponse en texte pour plus de détails
      res
        .status(response.status)
        .json({ statut: 400, message: `Erreur: ${errorResponse}` });
    }
  } catch (error) {
    res.status(500).json({ statut: 400, message: `Erreur interne: ${error}` });
  }
};
