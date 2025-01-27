import { Option } from "../../models/Option.js";
import {HttpError, shuffleArray} from "../index.js";

const remakeOptions = async (task) => {
  const {
    _id,
    condition,
    possibleScore,
    type,
    optionsQuant,
    topic,
    captionPicture,
  } = task;
  const optionsArr = await Option.find({ task: _id }).select("-task");
  if (!optionsArr) {
    throw HttpError(404, `Can not find options for match task with id: ${_id}`);
  }
  const correctAnswer = optionsArr.find((item) => item.isCorrect);
  if (!correctAnswer) {
    throw HttpError(404, `No correct answer found in the array of options in task ${_id}`);
  }
  const incorrectAnswers = optionsArr.filter((item) => !item.isCorrect);
  const randomIncorrect = shuffleArray(incorrectAnswers).slice(
    0,
    optionsQuant - 1
  );
  
  const result = shuffleArray([...randomIncorrect, correctAnswer].map(({name, _id: key}) => ({name, key})));
  return {
    condition,
    possibleScore,
    type,
    optionsQuant,
    topic,
    captionPicture,
    _id,
    options: result,
  };
};

export default remakeOptions;
