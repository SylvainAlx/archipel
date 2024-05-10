import express from "express";
import { verifyJwt, isAdmin } from "../middlewares/authMiddleware.js";
import {
  deleteSelfNation,
  deleteOneNation,
  getAllNations,
  getOneNation,
  getSelfNation,
  getTop100Nations,
  updateNation,
  getRoleplayData,
  createNation,
} from "../controllers/nationController.js";

const nationRouter = express.Router();

nationRouter.get("/getall", getAllNations);
nationRouter.get("/getnations", getTop100Nations);
nationRouter.get("/:id", getOneNation);
nationRouter.get("/roleplay/:id", getRoleplayData);
nationRouter.get("/owner/get", [verifyJwt], getSelfNation);
nationRouter.post("/create", [verifyJwt], createNation);
nationRouter.post("/update", [verifyJwt], updateNation);
nationRouter.delete("/delete", [verifyJwt], deleteSelfNation);
nationRouter.delete("/admin/:id", [verifyJwt], [isAdmin], deleteOneNation);

export default nationRouter;
