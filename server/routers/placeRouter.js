import express from "express";
import { getPlaces } from "../controllers/placeController.js";

const placeRouter = express.Router();

placeRouter.get("/:id", getPlaces);

export default placeRouter;
