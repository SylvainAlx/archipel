import express from "express";
import {
  createTile,
  deleteTile,
  getNationTile,
  updateTile,
} from "../controllers/tileController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const tileRouter = express.Router();

tileRouter.delete("/:id", [verifyJwt], deleteTile);
tileRouter.post("/create", [verifyJwt], createTile);
tileRouter.post("/update", [verifyJwt], updateTile);
tileRouter.get("/:id", getNationTile);

export default tileRouter;
