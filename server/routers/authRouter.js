import express from "express";
import { register, login, verify } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify", verify);

export default authRouter;
