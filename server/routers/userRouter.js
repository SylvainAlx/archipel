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
  getUsersByNation,
  usersCount,
  changePassword,
  updateUser,
  changeStatus
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/count", usersCount);
userRouter.post("/signup", register);
userRouter.post("/signin", login);
userRouter.post("/forgetpassword", forgetPassword);
userRouter.post("/changepassword", [verifyJwt], changePassword);
userRouter.post("/update", [verifyJwt], updateUser);
userRouter.post("/changestatus", [verifyJwt], changeStatus);
userRouter.get("/verify", verify);
userRouter.get("/getall", getAllUsers);
userRouter.get("/self", [verifyJwt], getSelfUser);
userRouter.get("/:id", getOneUser);
userRouter.get("/bynation/:id", getUsersByNation);
userRouter.delete("/delete", [verifyJwt], deleteSelfUser);

export default userRouter;
