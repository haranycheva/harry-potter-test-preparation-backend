import express from "express";
import digestControllers from "../controllers/digest-controllers.js";
import authorization from "../middleware/authorization.js";

const digestRouter = express.Router();

digestRouter.get("/", authorization, digestControllers.getAllTopics);

digestRouter.get("/:id", authorization, digestControllers.getTopicById);

digestRouter.get("/task/:id", authorization, digestControllers.getTaskById);

digestRouter.get(
  "/tasks/:topicId",
  authorization,
  digestControllers.getTopicTasksInformation
);

digestRouter.get(
  "/test/:topicId",
  authorization,
  digestControllers.getTestTasks
);

export default digestRouter;
