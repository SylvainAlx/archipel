import dotenv from "dotenv";
dotenv.config(); // Charger les variables d'environnement dès le début

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import requestIp from "request-ip";
import { home } from "./views/serverHome.js";
import nationRouter from "./routers/nationRouter.js";
import comRouter from "./routers/comRouter.js";
import placeRouter from "./routers/placeRouter.js";
import paramRouter from "./routers/paramRouter.js";
import userRouter from "./routers/userRouter.js";
import { verifyJwt } from "./middlewares/authMiddleware.js";
import { deleteUploadedFile } from "./controllers/files.js";
import relationRouter from "./routers/relationRouter.js";
import tileRouter from "./routers/tileRouter.js";
import bodyParser from "body-parser";
import { verifyCaptcha } from "./controllers/captchaController.js";

// config serveur
const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(cors());

app.use(requestIp.mw());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

if (!process.env.MONGO_DB_URI) {
  console.error("MONGO_DB_URI missing in .env");
  process.exit(1); // Quitte l'application avec un code d'erreur
}

const connectToDatabase = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database connection OK");
  } catch (error) {
    console.log("Database connection KO :", error);
  }
};

connectToDatabase();

// Définition des routes
app.use("/user", userRouter);
app.use("/nation", nationRouter);
app.use("/com", comRouter);
app.use("/place", placeRouter);
app.use("/param", paramRouter);
app.use("/relation", relationRouter);
app.use("/tile", tileRouter);
app.delete("/file/delete/:id", [verifyJwt], deleteUploadedFile);
app.post("/captcha", verifyCaptcha);
app.use("/", home);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`server running at PORT : ${PORT}`);
});
