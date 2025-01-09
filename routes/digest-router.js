import express from "express";
import digestControllers from "../controllers/digest-controllers.js";
import authorization from "../middleware/authorization.js";

const digestRouter = express.Router();

digestRouter.get("/", authorization, digestControllers.getAllTopics);

digestRouter.get(authorization, "/:id", digestControllers.getTopicById);

digestRouter.get(authorization, "/task/:id", digestControllers.getTaskById);

digestRouter.get(
  authorization,
  "/tasks/:topicId",
  digestControllers.getTopicTasksInformation
);

digestRouter.get(
  authorization,
  "/test/::topicId",
  digestControllers.getTestTasks
);

export default digestRouter;
