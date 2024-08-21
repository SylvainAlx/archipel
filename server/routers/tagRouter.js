import express from "express";
import { getAllTags, tagsCount } from "../controllers/tagController.js";

const tagRouter = express.Router();

tagRouter.get("/getall", getAllTags);
tagRouter.get("/count", tagsCount);

export default tagRouter;
