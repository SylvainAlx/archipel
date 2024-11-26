import express from "express";
import { getAdminComs, reportContent } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getadmincoms", getAdminComs);
adminRouter.get("/reportcontent/:id", reportContent);

export default adminRouter;
