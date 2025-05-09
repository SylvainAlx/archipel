import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import {
  createStructure,
  deleteStructure,
  getStructure,
  getStructures,
  updateStructure,
} from "../controllers/structureController.js";

const structureRouter = express.Router();

structureRouter.get("/:id", getStructure);
structureRouter.get("/", getStructures);
structureRouter.post("/create", [verifyJwt], createStructure);
structureRouter.post("/update", [verifyJwt], updateStructure);
structureRouter.delete("/", [verifyJwt], deleteStructure);

export default structureRouter;
