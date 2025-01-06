import express from "express";
import { getCounts } from "../controllers/statsConstroller.js";

const statsRouter = express.Router();

statsRouter.get("/counts", getCounts);

export default statsRouter;
