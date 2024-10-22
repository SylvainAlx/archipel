import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import {
  deleteSelfNation,
  getAllNations,
  getOneNation,
  getSelfNation,
  getTop100Nations,
  updateNation,
  getRoleplayData,
  createNation,
  nationsCount,
  getTags,
} from "../controllers/nationController.js";

const nationRouter = express.Router();

nationRouter.get("/count", nationsCount);
nationRouter.get("/gettags", getTags);
nationRouter.get("/getall", getAllNations);
nationRouter.get("/getnations", getTop100Nations);
nationRouter.get("/:id", getOneNation);
nationRouter.get("/roleplay/:id", getRoleplayData);
nationRouter.get("/owner/get", [verifyJwt], getSelfNation);
nationRouter.post("/create", [verifyJwt], createNation);
nationRouter.post("/update", [verifyJwt], updateNation);
nationRouter.delete("/delete", [verifyJwt], deleteSelfNation);

export default nationRouter;
