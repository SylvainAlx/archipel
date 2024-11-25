import express from "express";
import {
  comCount,
  createCom,
  deleteCom,
  getAdminComs,
  getDestinationComs,
  getPublicComs,
  getPublicComsByOrigin,
} from "../controllers/comController.js";
import { isAdmin, verifyJwt } from "../middlewares/authMiddleware.js";

const comRouter = express.Router();

comRouter.get("/count", comCount);
comRouter.get("/getbydestination/:id", getDestinationComs);
comRouter.get("/getpubliccoms", getPublicComs);
comRouter.get("/getadmincoms", [isAdmin], getAdminComs);
comRouter.get("/getpubliccoms/:id", getPublicComsByOrigin);
comRouter.post("/create", [verifyJwt], createCom);
comRouter.delete("/delete/:id", [verifyJwt], deleteCom);

export default comRouter;
