// import "@tensorflow/tfjs";

// const chargerNSFWJS = async () => {
//   const nsfwjs = await import("nsfwjs");
//   return nsfwjs;
// };

// const loadModel = async () => {
//   const nsfwjs = await chargerNSFWJS();
//   const model = await nsfwjs.load();
//   return model;
// };

// export const verifyImage = async (AFile: File) => {
//   return new Promise<{ isNSFW: boolean; predictions: any[] }>((resolve) => {
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const image = new Image();
//       image.src = e.target?.result as string;

//       image.onload = async () => {
//         const model = await loadModel();
//         const predictions = await model.classify(image);

//         const isNSFW = predictions.some(
//           (prediction: { className: string; probability: number; }) =>
//             prediction.className !== "Neutral" &&
//             prediction.className !== "Drawing" &&
//             prediction.probability > 0.7,
//         );

//         resolve({ isNSFW, predictions });
//       };
//     };

//     reader.readAsDataURL(AFile);
//   });
// };

// export const highConfidencePredictions = (predictions: any[]) =>
//   predictions.filter((prediction) => prediction.probability > 0.7);
