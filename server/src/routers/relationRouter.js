import express from "express";
import {
  createRelation,
  getAllRelation,
  updateRelation,
} from "../controllers/relationController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const relationRouter = express.Router();

relationRouter.get("/getall", getAllRelation);
relationRouter.post("/create", [verifyJwt], createRelation);
relationRouter.post("/update", [verifyJwt], updateRelation);

export default relationRouter;
