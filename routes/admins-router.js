import express from "express";
import adminsControllers from "../controllers/admins-controllers.js";
import { upload } from "../middleware/index.js";
import { validateBody } from "../decorators/index.js";
const adminsRouter = express.Router();

adminsRouter.post("/", adminsControllers.addTopic);

adminsRouter.post(
  "/:id",
  upload.single("captionPicture"),
  adminsControllers.addTaskToTopic
);

adminsRouter.post(
  "/option/:id",
  adminsControllers.addOptions
);

adminsRouter.post(
  "/question/:id",
  adminsControllers.addQuestions
);

// authRouter.post(
//   "/signin",
//   validateBody(signinValidationSchema),
//   authControllers.signin
// );

// authRouter.get("/getInfo", authorization, authControllers.getInfo);

// authRouter.post("/logout", authorization, authControllers.logout);

// authRouter.put(
//   "/",
//   upload.single("avatar"),
//   authorization,
//   validateBody(editUserSchema),
//   authControllers.redactUser
// );

export default adminsRouter;
