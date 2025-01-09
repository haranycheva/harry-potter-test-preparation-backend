import express from "express";
import progressControllers from "../controllers/progress-controllers.js";
import authorization from "../middleware/authorization.js";
const progressRouter = express.Router();

progressRouter.get(
  "/topic/:topicId",
  authorization,
  progressControllers.getTopicProgress
);

progressRouter.get(
  "/test/:topicId",
  authorization,
  progressControllers.getTestProgress
);

progressRouter.get(
  "/task/:taskId",
  authorization,
  progressControllers.getTaskProgress
);

export default progressRouter;
