import { Task } from "../../models/Task.js";
import { HttpError } from "../index.js";

const checkInput = async (task) => {
  const { _id, answer: userAnswer } = task;
  const digestTask = await Task.findById(_id);
  if (!digestTask) {
    throw HttpError(404, `Can not find task with id: ${_id}`);
  }
  if (userAnswer.trim() === digestTask.answer) {
    return {
      score: digestTask.possibleScore,
      userAnswer: { answer: userAnswer, isCorrect: true },
    };
  }
  return { score: 0, userAnswer: { answer: userAnswer, isCorrect: false } };
};

export default checkInput;
