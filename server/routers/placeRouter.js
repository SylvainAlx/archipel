import express from "express";
import {
  getPlaces,
  createPlace,
  deletePlace,
  getAllPlaces,
  getOne,
  updatePlace,
  placesCount,
} from "../controllers/placeController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const placeRouter = express.Router();

placeRouter.get("/count", placesCount);
placeRouter.get("/getall", getAllPlaces);
placeRouter.get("/:id", getOne);
placeRouter.get("/bynation/:id", getPlaces);
placeRouter.post("/create", [verifyJwt], createPlace);
placeRouter.post("/update", [verifyJwt], updatePlace);
placeRouter.delete("/delete/:id", [verifyJwt], deletePlace);

export default placeRouter;
