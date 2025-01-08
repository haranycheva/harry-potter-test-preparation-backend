import express from "express";
import digestControllers from "../controllers/digest-controllers.js";
import authorization  from "../middleware/authorization.js";

const digestRouter = express.Router();

digestRouter.get("/", digestControllers.getAllTopics);

digestRouter.get(
  "/:id",
  digestControllers.getTopicById
);

digestRouter.get(
  "/task/:id",
  digestControllers.getTaskById
);

digestRouter.get(
  "/tasks/:topicId",
  digestControllers.getTopicTasksInformation
);

digestRouter.get(
  "/test/:topicId",
  digestControllers.getTestTasks
);

export default digestRouter;
