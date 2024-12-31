import express from "express";
import adminsControllers from "../controllers/admins-controllers.js";
import { upload, validateTask } from "../middleware/index.js";
import {validateBody} from "../decorators/index.js";
import { TopicValidationSchema } from "../schema/admins/topic-schema.js";

const adminsRouter = express.Router();

adminsRouter.post("/", validateBody(TopicValidationSchema), adminsControllers.addTopic);

adminsRouter.post(
  "/:id",
  validateTask,
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
