import express from "express";
import {
  comCount,
  createCom,
  deleteCom,
  getDestinationComs,
  getPublicComs,
} from "../controllers/comController.js";
import { isAdmin, verifyJwt } from "../middlewares/authMiddleware.js";

const comRouter = express.Router();

comRouter.get("/count", comCount);
comRouter.get("/getbydestination/:id", getDestinationComs);
comRouter.get("/getpubliccoms", getPublicComs);
comRouter.post("/create", [verifyJwt], createCom);
comRouter.delete("/delete/:id", [isAdmin], deleteCom);

export default comRouter;
