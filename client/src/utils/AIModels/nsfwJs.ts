import * as nsfwjs from "nsfwjs";
import "@tensorflow/tfjs";

// Charger le modèle NSFW une seule fois
const loadModel = async () => {
  const model = await nsfwjs.load();
  return model;
};

// Fonction de vérification de l'image
export const verifyImage = async (AFile: File) => {
  return new Promise<boolean>((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const image = new Image();
      image.src = e.target?.result as string;

      image.onload = async () => {
        const model = await loadModel();
        const predictions = await model.classify(image);
        const isNSFW = predictions.some(
          (prediction) =>
            prediction.className !== "Neutral" &&
            prediction.className !== "Drawing" &&
            prediction.probability > 0.7,
        );

        resolve(isNSFW);
      };
    };

    reader.readAsDataURL(AFile); // Convertit le fichier en Data URL pour l'analyse
  });
};
