import express from "express";
import digestControllers from "../controllers/digest-controllers.js";
import { upload, validateTask } from "../middleware/index.js";

const digestRouter = express.Router();

digestRouter.get("/", digestControllers.getAllTopics);

digestRouter.post(
  "/:id",
  digestControllers.getTopicById
);

digestRouter.post(
  "/task/:id",
  digestControllers.getTaskById
);


digestRouter.post(
  "/tasks/:topicId",
  digestControllers.getTopicTasksInformation
);

digestRouter.post(
  "/test/:id",
  digestControllers.getTestTasks
);

export default digestRouter;
