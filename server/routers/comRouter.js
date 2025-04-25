import express from "express";
import {
  comCount,
  createCom,
  deleteCom,
  getComs,
  getDestinationComs,
  getLastNews,
  getPublicComs,
  getPublicComsByOrigin,
  readCom,
} from "../controllers/comController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const comRouter = express.Router();

comRouter.get("/count", comCount);
comRouter.get("/getcoms", [verifyJwt], getComs);
comRouter.get("/getbydestination/:id", [verifyJwt], getDestinationComs);
comRouter.get("/getpubliccoms", getPublicComs);
comRouter.get("/getlastnews", getLastNews);
comRouter.get("/getpubliccoms/:id", getPublicComsByOrigin);
comRouter.post("/create", [verifyJwt], createCom);
comRouter.post("/read", [verifyJwt], readCom);
comRouter.delete("/delete/:id", [verifyJwt], deleteCom);

export default comRouter;
