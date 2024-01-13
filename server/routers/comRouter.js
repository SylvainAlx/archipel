import express from "express";
import { createCom, deleteCom, getAll } from "../controllers/comController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const comRouter = express.Router();

comRouter.get("/getall", getAll);
comRouter.post("/create", createCom);
comRouter.delete("/delete/:id", deleteCom);

export default comRouter;
