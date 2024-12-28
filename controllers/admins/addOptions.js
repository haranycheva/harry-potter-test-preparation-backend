import { HttpError } from "../../helpers/index.js";
import { Option } from "../../models/Option.js";
import { Question } from "../../models/Question.js";
import { Task } from "../../models/Task.js";

const addOptions = async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    throw HttpError(404, "Task with that id does not exist");
  }
  const result = []
  for (const el of req.body.optionsArr){
    const newOption = await Option.create({
        ...el,
        task: taskId,
      });
      if (!newOption) {
        throw HttpError(500, `Creating option ${el} failed`);
      }
      result.push(newOption)
  }
  res.status(201).json(result);
};

export default addOptions;
