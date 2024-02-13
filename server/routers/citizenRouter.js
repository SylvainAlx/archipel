import express from "express";
import { getCitizens } from "../controllers/citizenController.js";

const citizenRouter = express.Router();

citizenRouter.get("/:id", getCitizens);

export default citizenRouter;
