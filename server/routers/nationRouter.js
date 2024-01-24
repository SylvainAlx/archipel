import express from "express";
import { verifyJwt, isAdmin } from "../middlewares/authMiddleware.js";
import {
  deleteSelf,
  deleteOne,
  getAll,
  getOne,
  getSelf,
  getTop100,
  updateNation,
} from "../controllers/nationController.js";

const nationRouter = express.Router();

nationRouter.get("/getall", getAll);
nationRouter.get("/getnations", getTop100);
nationRouter.get("/:id", getOne);
nationRouter.get("/owner/get", [verifyJwt], getSelf);
nationRouter.post("/update", [verifyJwt], updateNation);
nationRouter.delete("/owner/delete", [verifyJwt], deleteSelf);
nationRouter.delete("/admin/:id", [verifyJwt], [isAdmin], deleteOne);

export default nationRouter;
