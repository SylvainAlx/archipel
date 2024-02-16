import express from "express";
import { createCom, deleteCom, getAll } from "../controllers/comController.js";
import { isAdmin, verifyJwt } from "../middlewares/authMiddleware.js";

const comRouter = express.Router();

comRouter.get("/getall", getAll);
comRouter.post("/create", [verifyJwt], createCom);
comRouter.delete("/delete/:id", [isAdmin], deleteCom);

export default comRouter;
