import express from "express";
import {
  comCount,
  createCom,
  deleteCom,
  getDestinationComs,
  getPublicComs,
  getPublicComsByOrigin,
} from "../controllers/comController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const comRouter = express.Router();

comRouter.get("/count", comCount);
comRouter.get("/getbydestination/:id", getDestinationComs);
comRouter.get("/getpubliccoms", getPublicComs);
comRouter.get("/getpubliccoms/:id", getPublicComsByOrigin);
comRouter.post("/create", [verifyJwt], createCom);
comRouter.delete("/delete/:id", [verifyJwt], deleteCom);

export default comRouter;
