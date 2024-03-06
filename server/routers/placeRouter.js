import express from "express";
import {
  getPlaces,
  createPlace,
  deletePlace,
  getAllPlaces,
} from "../controllers/placeController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const placeRouter = express.Router();

placeRouter.get("/getall", getAllPlaces);
placeRouter.get("/:id", getPlaces);
placeRouter.post("/create", [verifyJwt], createPlace);
placeRouter.delete("/delete/:id", [verifyJwt], deletePlace);

export default placeRouter;
