import express from "express";
import { createTile, getNationTile } from "../controllers/tileController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const tileRouter = express.Router();

tileRouter.post("/create", [verifyJwt], createTile);
tileRouter.get("/:id", getNationTile);

export default tileRouter;
