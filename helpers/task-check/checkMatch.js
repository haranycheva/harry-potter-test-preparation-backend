import { Question } from "../../models/Question.js";
import { Task } from "../../models/Task.js";
import { HttpError } from "../index.js";
import {findRightAnswers} from "./index.js";

const checkMatch = async (task) => {
  const { _id, answer: userAnswer } = task;
  const digestTask = await Task.findById(_id);
  if (!digestTask) {
    throw HttpError(404, `Can not find task with id: ${_id}`);
  }
  if (userAnswer.length < digestTask.questionsQuant) {
    throw HttpError(400, `All matches must have answers`);
  }
  const matchesArr = await Question.find({ task: _id });
  if (!matchesArr) {
    throw HttpError(
      404,
      `Can not find questions for match task with id: ${_id}`
    );
  }
  const comparedMatches = userAnswer.every((item) =>
    matchesArr.some((match) => String(match._id) === item.condition)
  );
  if (!comparedMatches) {
    throw HttpError(
      404,
      `Can not find matches from user's answers in task with id ${_id}`
    );
  }
  const rightAnswers = await findRightAnswers(userAnswer);
  const score = Math.floor(
    (digestTask.possibleScore / digestTask.questionsQuant) * rightAnswers.score
  );
  return { score, userAnswers: rightAnswers.answers };
};

export default checkMatch;
