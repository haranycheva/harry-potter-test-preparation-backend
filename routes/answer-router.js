import express from "express";
import answerControllers from "../controllers/answer-controllers.js";
import authorization from "../middleware/authorization.js";
import validateAnswers from "../middleware/validateAnswers.js";
import validateBody from "../decorators/validateBody.js";
import { testAnswersValidationSchema } from "../schema/user-answers/index.js";
const answerRouter = express.Router();

answerRouter.post(
  "/",
  validateAnswers,
  authorization,
  answerControllers.sendTaskAnswers
);

answerRouter.post(
  "/:topicId",
  validateBody(testAnswersValidationSchema),
  authorization,
  answerControllers.sendTestAnswers
);

export default answerRouter;
