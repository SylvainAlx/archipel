import express from "express";
import {
  getPlaces,
  createPlace,
  deletePlace,
  getAllPlaces,
} from "../controllers/placeController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const placeRouter = express.Router();

placeRouter.get("/:id", getPlaces);
placeRouter.get("/getall", getAllPlaces);
placeRouter.post("/create", [verifyJwt], createPlace);
placeRouter.delete("/delete/:id", [verifyJwt], deletePlace);

export default placeRouter;
