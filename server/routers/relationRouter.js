import express from "express";
import { createRelation, getAllRelation } from "../controllers/relationController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const relationRouter = express.Router();

relationRouter.get("/getall", getAllRelation);
relationRouter.post("/create", [verifyJwt], createRelation)

export default relationRouter;
