import express from "express";
import cors from "cors";
import { home } from "./views/serverHome.js";
import authRouter from "./routers/authRouter.js";
import nationRouter from "./routers/nationRouter.js";
import comRouter from "./routers/comRouter.js";
import placeRouter from "./routers/placeRouter.js";
import paramRouter from "./routers/paramRouter.js";
import userRouter from "./routers/userRouter.js";
import { verifyJwt } from "./middlewares/authMiddleware.js";
import { deleteUploadedFile } from "./controllers/files.js";
import relationRouter from "./routers/relationRouter.js";
import { runMongoDB } from "./utils/db.js";

// config serveur
const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

try {
  runMongoDB().catch(console.dir);
} catch (error) {
  console.log(error);
}

try {
  app.listen(PORT, () => {
    console.log(`server running at PORT : ${PORT}`);
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/nation", nationRouter);
    app.use("/com", comRouter);
    app.use("/place", placeRouter);
    app.use("/param", paramRouter);
    app.use("/relation", relationRouter);
    app.delete("/file/delete/:id", [verifyJwt], deleteUploadedFile);
    app.use("/", home);
  });
} catch (error) {
  console.log(error);
}
