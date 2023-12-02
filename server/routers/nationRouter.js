import express from "express";
import { getAll, getOne } from "../controllers/nationController.js";

const nationRouter = express.Router();

nationRouter.get("/getall", getAll);
nationRouter.get("/:id", getOne);

export default nationRouter;
