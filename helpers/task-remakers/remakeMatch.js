import { Question } from "../../models/Question.js";
import { shuffleArray } from "../index.js";

const remakeMatch = async (task) => {
  const { _id, condition, possibleScore, type, questionsQuant, topic, conditionPicture } = task;
  const matchesArr = await Question.find({ task: _id }).select("-task -_id");
  if (!matchesArr) {
    throw HttpError(
      404,
      `Can not find questions for match task with id: ${_id}`
    );
  }
  const remakedMatchesArr = shuffleArray(matchesArr).slice(0, questionsQuant)
  const matches = {
    conditions: remakedMatchesArr.map((item) => item.condition),
    answers: remakedMatchesArr.map((item) => item.answer),
  };
  if (task?.oddAnswers) {
    matches.answers.push(...task?.oddAnswers);
  }
  matches.answers = shuffleArray(matches.answers);
  matches.conditions = shuffleArray(matches.conditions);
  const remakedTask = {
    _id,
    topic,
    condition,
    possibleScore,
    type,
    questionsQuant,
    conditionPicture,
    ...matches,
  };
  return remakedTask;
};

export default remakeMatch;
