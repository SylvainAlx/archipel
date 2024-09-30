import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { home } from "./views/serverHome";

// import authRouter from "./routers/authRouter.js";
// import nationRouter from "./routers/nationRouter.js";
// import comRouter from "./routers/comRouter.js";
// import placeRouter from "./routers/placeRouter.js";
// import paramRouter from "./routers/paramRouter.js";
// import userRouter from "./routers/userRouter.js";
import { verifyJwt } from "./middlewares/authMiddleware";
import { deleteUploadedFile } from "./controllers/files";
// import relationRouter from "./routers/relationRouter.js";

// config serveur
const app: express.Application = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

if (!process.env.MONGO_DB_URI) {
  console.error("MONGO_DB_URI n'est pas défini dans le fichier .env");
  process.exit(1); // Quitte l'application avec un code d'erreur
}

const connectToDatabase = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("connexion à la base de données");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
  }
};

connectToDatabase();

// Définition des routes
// app.use("/user", userRouter);
// app.use("/auth", authRouter);
// app.use("/nation", nationRouter);
// app.use("/com", comRouter);
// app.use("/place", placeRouter);
// app.use("/param", paramRouter);
// app.use("/relation", relationRouter);
app.delete("/file/delete/:id", [verifyJwt], deleteUploadedFile);
app.use("/", home);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`server running at PORT : ${PORT}`);
});
