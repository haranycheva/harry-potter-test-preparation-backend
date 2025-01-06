import { remakeTask, HttpError } from "../../helpers/index.js";
import { Task } from "../../models/Task.js";

const getTaskById = async (req, res, next) => {
  const taskId = req.params.id;
  const result = await Task.findById(taskId);
  if (!result) {
    throw HttpError(404, `Can not find post with id = ${taskId}`);
  }
  const remakedTask = await remakeTask(result);
  res.json(remakedTask);
};

export default getTaskById;
