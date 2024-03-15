import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  createParam,
  getAllParams,
  getParam,
} from "../controllers/paramController.js";

const paramRouter = express.Router();

paramRouter.post("/create", [isAdmin], createParam);
paramRouter.get("/getall", [isAdmin], getAllParams);
paramRouter.get("/:name", getParam);

export default paramRouter;
