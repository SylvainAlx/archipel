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

structureRouter.get("/getall", getStructures);
structureRouter.get("/:id", getStructure);
structureRouter.post("/create", [verifyJwt], createStructure);
structureRouter.post("/update", [verifyJwt], updateStructure);
structureRouter.delete("/:id", [verifyJwt], deleteStructure);

export default structureRouter;
