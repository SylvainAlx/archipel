import express from "express";
import {
  createCom,
  deleteCom,
  getAllComs,
} from "../controllers/comController.js";
import { isAdmin, verifyJwt } from "../middlewares/authMiddleware.js";

const comRouter = express.Router();

comRouter.get("/getall", getAllComs);
comRouter.post("/create", [verifyJwt], createCom);
comRouter.delete("/delete/:id", [isAdmin], deleteCom);

export default comRouter;
