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
import { isAdmin, verifyJwt } from "./middlewares/authMiddleware.js";
import { deleteUploadedFile } from "./controllers/files.js";
import relationRouter from "./routers/relationRouter.js";
import tileRouter from "./routers/tileRouter.js";
import bodyParser from "body-parser";
import { verifyCaptcha } from "./controllers/captchaController.js";
import adminRouter from "./routers/adminRouter.js";
import statsRouter from "./routers/statsRouter.js";
import { pingBackend } from "./utils/functions.js";

// config serveur
const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

const optionsCors = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(optionsCors));

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
    console.log(`${new Date().toISOString()} : Database connection OK`);
  } catch (error) {
    console.error(
      `${new Date().toISOString()} : Database connection KO : `,
      error,
    );
  }
};

connectToDatabase();

// Définition des routes
app.use("/admin", [verifyJwt], [isAdmin], adminRouter);
app.use("/user", userRouter);
app.use("/nation", nationRouter);
app.use("/com", comRouter);
app.use("/place", placeRouter);
app.use("/param", [verifyJwt], paramRouter);
app.use("/relation", relationRouter);
app.use("/tile", tileRouter);
app.use("/stats", statsRouter);
app.delete("/file/delete/:id", [verifyJwt], deleteUploadedFile);
app.post("/captcha", verifyCaptcha);
app.use("/", home);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`${new Date().toISOString()} : Server running at PORT : ${PORT}`);
});

//Ping régulier
const interval = process.env.PING_INTERVAL;
if (interval > 0) {
  console.log(`${new Date().toISOString()} : Ping every ${interval}ms`);
  setInterval(pingBackend, interval);
}
