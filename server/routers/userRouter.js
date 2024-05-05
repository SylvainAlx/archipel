import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import {
  register,
  login,
  verify,
  forgetPassword,
  getAllUsers,
  deleteSelfUser,
  getOneUser,
  getSelfUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/signin", login);
userRouter.post("/forgetpassword", forgetPassword);
userRouter.get("/verify", verify);
userRouter.get("/getall", getAllUsers);
userRouter.get("/self", [verifyJwt], getSelfUser);
userRouter.get("/:id", getOneUser);
userRouter.delete("/delete", [verifyJwt], deleteSelfUser);

export default userRouter;
