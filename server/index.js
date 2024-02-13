import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { home } from "./views/serverHome.js";
import authRouter from "./routers/authRouter.js";
import nationRouter from "./routers/nationRouter.js";
import comRouter from "./routers/comRouter.js";
import citizenRouter from "./routers/citizenRouter.js";
import placeRouter from "./routers/placeRouter.js";

//config serveur
const app = express();
const PORT = 3000;
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//connection à la base de données
try {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_DB_URI);
  mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
  });
  mongoose.connection.on("open", () => {
    console.log("connexion à la base de données");
  });
} catch (error) {
  console.log(error);
}

//écouteur du port
try {
  app.listen(PORT, () => {
    console.log(`server running at PORT : ${PORT}`);
    app.use("/auth", authRouter);
    app.use("/nation", nationRouter);
    app.use("/com", comRouter);
    app.use("/citizen", citizenRouter);
    app.use("/place", placeRouter);
    app.use("/", home);
  });
} catch (error) {
  console.log(error);
}
