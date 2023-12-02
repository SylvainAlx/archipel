import express from "express";
import { getAll } from "../controllers/workController.js";

const workRouter = express.Router();

workRouter.get("/getall", getAll);

export default workRouter;
