import { HttpError } from "../../helpers/index.js";
import { Task } from "../../models/Task.js";

const getTopicTasksInformation = async (req, res, next) => {
  const topicId = req.params.topicId;
  const result = await Task.find({
    isTest: { $exists: false },
    topic: topicId,
  });
  if (!result) {
    throw HttpError(
      404,
      `Can not find any task for topic with id ${topicId}`
    );
  }
  res.json(result);
};

export default getTopicTasksInformation;
