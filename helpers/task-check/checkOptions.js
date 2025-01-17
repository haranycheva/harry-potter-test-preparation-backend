import { Task } from "../../models/Task.js";
import { Option } from "../../models/Option.js";

const checkOptions = async (task) => {
  const { _id, selectedOptionId } = task;
  const digestTask = await Task.findById(_id);
  if (!digestTask) {
    throw HttpError(404, `Can not find task with id: ${_id}`);
  }
  const correctAnsw = await Option.findOne({task: _id, isCorrect: true})
  if (!correctAnsw) {
    throw HttpError(404, `No correct answer found in task ${_id}`);
  }
  if(String(correctAnsw._id) === selectedOptionId){
    return {score: digestTask.possibleScore, userAnswer: {selectedOptionId, isCorrect: true},}
  }
  return {score: 0, userAnswer: {selectedOptionId, isCorrect: false}};
};

export default checkOptions;
