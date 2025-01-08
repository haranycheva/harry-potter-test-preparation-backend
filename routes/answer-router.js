import express from "express";
import answerControllers from "../controllers/answer-controllers.js";
import authorization from "../middleware/authorization.js";
const answerRouter = express.Router();

answerRouter.post("/", authorization, answerControllers.sendTaskAnswers);

answerRouter.post("/:topicId", authorization, answerControllers.sendTestAnswers);

export default answerRouter;
