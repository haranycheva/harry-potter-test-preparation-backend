import { HttpError } from "../../helpers/index.js";
import { Question } from "../../models/Question.js";
import { Task } from "../../models/Task.js";

const addQuestions = async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    throw HttpError(404, "Task with that id does not exist");
  }
  const result = [];
  if (req.body.questionsArr) {
    for (const el of req.body.questionsArr) {
      const newQuestion = await Question.create({
        ...el,
        task: taskId,
      });
      if (!newQuestion) {
        throw HttpError(500, `Creating question ${el} failed`);
      }
      result.push(newQuestion);
    }
    res.status(201).json(result);
  } else {
    const { condition, answer } = req.body;
    const newQuestion = await Question.create({
      condition,
      answer,
      task: taskId,
    });
    if (!newQuestion) {
      throw HttpError(500, `Creating question ${condition} failed`);
    }
    res.status(201).json(newQuestion);
  }
};

export default addQuestions;
