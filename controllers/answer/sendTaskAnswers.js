import { checkTask } from "../../helpers/task-check/index.js";
import { TaskProgress } from "../../models/TaskProgress.js";

const sendTaskAnswers = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { _id: taskId } = req.body;
  const taskResults = await checkTask({ ...req.body, _id: taskId });
  const taskProgress = await TaskProgress.findOne({
    task: taskId,
    owner: userId,
  });
  if (taskProgress) {
    const score =
      taskProgress.score > taskResults.score
        ? taskProgress.score
        : taskResults.score;
    await TaskProgress.findByIdAndUpdate(taskProgress._id, { score });
    return res.json({ ...taskResults, score });
  }
  const newTaskProgress = await TaskProgress.create({
    task: taskId,
    owner: userId,
    score: taskResults.score,
  });
  if (!newTaskProgress) {
    throw HttpError(500, `Creating task progress for task ${taskId} failed`);
  }
  return res.json(taskResults);
};

export default sendTaskAnswers;
