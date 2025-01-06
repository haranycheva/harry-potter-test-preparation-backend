import { Option } from "../../models/Option.js";
import {shuffleArray} from "../index.js";

const remakeOptions = async (task) => {
  const {
    _id,
    condition,
    possibleScore,
    type,
    optionsQuant,
    topic,
    conditionPicture,
  } = task;
  const optionsArr = await Option.find({ task: _id }).select("-_id -task");
  if (!optionsArr) {
    throw HttpError(404, `Can not find options for match task with id: ${_id}`);
  }
  const correctAnswer = optionsArr.find((item) => item.isCorrect);
  if (!correctAnswer) {
    throw new Error("No correct answer found in the array.");
  }
  const incorrectAnswers = optionsArr.filter((item) => !item.isCorrect);
  const randomIncorrect = shuffleArray(incorrectAnswers).slice(
    0,
    optionsQuant - 1
  );

  const result = shuffleArray([...randomIncorrect, correctAnswer].map((item) => item.name));
  return {
    condition,
    possibleScore,
    type,
    optionsQuant,
    topic,
    conditionPicture,
    _id,
    options: result,
  };
};

export default remakeOptions;
