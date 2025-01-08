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
  const testResults = await Promise.all(
    userAnswers.reduce(async (accum, item) => {
      const taskResults = await checkTask(item);
      return {
        score: accum.score + taskResults.score,
        userAnswers: [...accum.userAnswers, taskResults.userAnswer],
      };
    }),
    checkedTest
  );
  const test = await Task.find({ isTest: true, topic: topicId });
  const maxScore = test.reduce((accum, item) => accum + item.possibleScore);
  const completed = testResults.score / maxScore >= 0.9;
  const testProgress = await TestProgress.findOne({
    topic: topicId,
    owner: userId,
  });
  if (testProgress) {
    const score =
      testProgress.score > testResults.score
        ? testProgress.score
        : testResults.score;
    const updatedTestProgress = await TestProgress.findByIdAndUpdate(
      testProgress._id,
      { score }
    );
    if (!updatedTestProgress) {
      throw HttpError(
        500,
        `Updating test progress for test from topic with id: ${topicId} failed`
      );
    }
    return res.json({ ...testResults, score, maxScore, completed });
  }
  const newTestProgress = await TestProgress.create({
    topic: topicId,
    owner: userId,
    score: testResults.score,
  });
  if (!newTestProgress) {
    throw HttpError(
      500,
      `Creating test progress for test from topic with id: ${topicId} failed`
    );
  }
  return res.json({ ...testResults, maxScore, completed });
};

export default sendTestAnswers;
