import {HttpError} from "../../helpers/index.js";
import updateTopicProgress from "../../helpers/progresses/updateTopicProgress.js";
import { checkTask } from "../../helpers/task-check/index.js";
import { Task } from "../../models/Task.js";
import { TaskProgress } from "../../models/TaskProgress.js";

const sendTaskAnswers = async (req, res, next) => {
  const { _id: userId, currentTopic } = req.user;
  const { _id: taskId } = req.body;
  const taskResults = await checkTask({ ...req.body, _id: taskId });
  if (!taskResults) {
    throw HttpError(
      400,
      `This type of task is not supported or the type is not entered`
    );
  }
  const taskProgress = await TaskProgress.findOne({
    task: taskId,
    owner: userId,
  });
  const task = await Task.findById(taskId);
  if (taskProgress) {
    const maxScore =
      taskProgress.maxScore > taskResults.score
        ? taskProgress.maxScore
        : taskResults.score;
    if (maxScore === task.possibleScore && !taskProgress.wasCompleted) {
      await updateTopicProgress(task.topic, userId, currentTopic);
      taskProgress.wasCompleted = true;
    }
    await TaskProgress.findByIdAndUpdate(taskProgress._id, {
      maxScore,
      wasCompleted: taskProgress.wasCompleted,
    });
    return res.json({ ...taskResults, maxScore, possibleScore: task.possibleScore });
  }
  let wasCompleted = false;
  if (taskResults.score === task.possibleScore) {
    await updateTopicProgress(task.topic, userId, currentTopic);
    wasCompleted = true;
  }
  const newTaskProgress = await TaskProgress.create({
    task: taskId,
    owner: userId,
    maxScore: taskResults.score,
    wasCompleted,
  });
  if (!newTaskProgress) {
    throw HttpError(500, `Creating task progress for task ${taskId} failed`);
  }
  return res.json({ taskResults, maxScore: taskResults.score, possibleScore: task.possibleScore});
};

export default sendTaskAnswers;
