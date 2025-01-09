import {HttpError} from "../../helpers/index.js";
import { TaskProgress } from "../../models/TaskProgress.js";

const getTaskProgress = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { taskId } = req.params;
  const taskProgress = await TaskProgress.findOne({
    owner: userId,
    task: taskId,
  });
  if (!taskProgress) {
    throw HttpError(
      404,
      `Can not find task progress for task with id: ${taskId}`
    );
  }
  const { maxScore, owner, task } = taskProgress;
  res.json({ maxScore, owner, task });
};

export default getTaskProgress;
