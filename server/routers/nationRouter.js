import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import {
  deleteSelfNation,
  getAllNations,
  getOneNation,
  getTop100Nations,
  updateNation,
  createNation,
  nationsCount,
  getTags,
  transferCredits,
  giveOwnership,
} from "../controllers/nationController.js";

const nationRouter = express.Router();

nationRouter.get("/count", nationsCount);
nationRouter.get("/gettags", getTags);
nationRouter.get("/getall", getAllNations);
nationRouter.get("/getnations", getTop100Nations);
nationRouter.get("/:id", getOneNation);
nationRouter.post("/create", [verifyJwt], createNation);
nationRouter.post("/update", [verifyJwt], updateNation);
nationRouter.post("/transfer", [verifyJwt], transferCredits);
nationRouter.post("/giveownership", [verifyJwt], giveOwnership);
nationRouter.delete("/delete", [verifyJwt], deleteSelfNation);

export default nationRouter;
