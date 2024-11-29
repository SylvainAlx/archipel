import express from "express";
import {
  banContent,
  getAdminComs,
  reportContent,
  reverseBanContent,
  reverseReportContent,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getadmincoms", getAdminComs);
adminRouter.get("/reportcontent/:id", reportContent);
adminRouter.get("/reversereportcontent/:id", reverseReportContent);
adminRouter.get("/bancontent/:id", banContent);
adminRouter.get("/reversebancontent/:id", reverseBanContent);

export default adminRouter;
