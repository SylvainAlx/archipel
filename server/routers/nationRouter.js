import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import { deleteSelf, getAll, getOne } from "../controllers/nationController.js";

const nationRouter = express.Router();

nationRouter.get("/getall", getAll);
nationRouter.get("/:id", getOne);
nationRouter.delete("/:id", [verifyJwt], deleteSelf);

export default nationRouter;
