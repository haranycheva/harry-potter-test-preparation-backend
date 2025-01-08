import { Question } from "../../models/Question.js";
import { Task } from "../../models/Task.js";
import bcrypt from "bcryptjs";

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
    matchesArr.some((match) => match._id === item.condition)
  );
  if (!comparedMatches) {
    throw HttpError(
      404,
      `Can not find matches from user's answers in task with id ${_id}`
    );
  }
  const rightAnswers = userAnswer.reduce(findRightAnswersQuant, {
    score: 0,
    answers: [],
  });
  const score = Math.floor(
    (digestTask.possibleScore / digestTask.questionsQuant) * rightAnswers.score
  );
  return {score, userAnswers: rightAnswers.answers};
};

function findRightAnswersQuant(accum, item) {
  const { condition, answer } = item;
  if (bcrypt.compare(condition, answer)) {
    const answers = [...accum.answers, { condition, answer, isCorrect: true }];
    return { score: (accum.score += 1), answers };
  }
  const answers = [...accum.answers, { condition, answer, isCorrect: false }];
  return { score: accum.score, userAnswer: answers };
}

export default checkMatch;
