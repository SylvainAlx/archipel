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
  changeStatus,
  changePlan,
  transferCredits,
  createNewRecovery,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/signin", login);
userRouter.post("/forgetpassword", forgetPassword);
userRouter.post("/changepassword", [verifyJwt], changePassword);
userRouter.post("/createnewrecovery", [verifyJwt], createNewRecovery);
userRouter.post("/update", [verifyJwt], updateUser);
userRouter.post("/changestatus", [verifyJwt], changeStatus);
userRouter.post("/changeplan", changePlan);
userRouter.post("/transfer", [verifyJwt], transferCredits);
userRouter.get("/verify", [verifyJwt], verify);
userRouter.get("/getall", getAllUsers);
userRouter.get("/self", [verifyJwt], getSelfUser);
userRouter.get("/:id", getOneUser);
userRouter.get("/bynation/:id", getUsersByNation);
userRouter.get("/count", usersCount);
userRouter.delete("/delete", [verifyJwt], deleteSelfUser);

export default userRouter;
