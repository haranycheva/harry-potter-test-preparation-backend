import {HttpError} from "../../helpers/index.js";
import { checkTask } from "../../helpers/task-check/index.js";
import { Task } from "../../models/Task.js";
import { TestProgress } from "../../models/TestProgress.js";

const sendTestAnswers = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { userAnswers } = req.body;
  const { topicId } = req.params;
  const checkedTest = {
    score: 0,
    userAnswers: [],
  };

  const testResults = await userAnswers.reduce(async (accumPromise, item) => {
    const accum = await accumPromise;
    const taskResults = await checkTask(item);
    if (!taskResults) {
      throw HttpError(
        400,
        `This type of task is not supported or the type is not entered for task with id: ${item._id}`
      );
    }
    return {
      score: accum.score + taskResults.score,
      userAnswers: [...accum.userAnswers, taskResults.userAnswer],
    };
  }, Promise.resolve(checkedTest));

  const test = await Task.find({ isTest: true, topic: topicId });
  const possibleScore = test.reduce(
    (accum, item) => accum + item.possibleScore, 0
  );
  const completed = testResults.score / possibleScore >= 0.9;
  const testProgress = await TestProgress.findOne({
    topic: topicId,
    owner: userId,
  });
  if (testProgress) {
    const maxScore =
      testProgress.maxScore > testResults.score
        ? testProgress.maxScore
        : testResults.score;
    const updatedTestProgress = await TestProgress.findByIdAndUpdate(
      testProgress._id,
      { maxScore }
    );
    if (!updatedTestProgress) {
      throw HttpError(
        500,
        `Updating test progress for test from topic with id: ${topicId} failed`
      );
    }
    return res.json({ ...testResults, maxScore, completed, possibleScore });
  }
  const newTestProgress = await TestProgress.create({
    topic: topicId,
    owner: userId,
    maxScore: testResults.score,
  });
  if (!newTestProgress) {
    throw HttpError(
      500,
      `Creating test progress for test from topic with id: ${topicId} failed`
    );
  }
  return res.json({
    ...testResults,
    possibleScore,
    completed,
    maxScore: testResults.score,
  });
};

export default sendTestAnswers;
