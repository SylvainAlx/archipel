import express from "express";
import { getPlaces, createPlace } from "../controllers/placeController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const placeRouter = express.Router();

placeRouter.get("/:id", getPlaces);
placeRouter.post("/create", [verifyJwt], createPlace);

export default placeRouter;
