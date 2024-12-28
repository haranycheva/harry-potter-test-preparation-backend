import { HttpError } from "../../helpers/index.js";
import { Task } from "../../models/Task.js";
import { Topic } from "../../models/Topic.js";

const addTaskToTopic = async (req, res) => {
  const topicId = req.params.id;
  const topic = await Topic.findById(topicId);
  if (!topic) {
    throw HttpError(404, "Topic with that id does not exist");
  }
  if (req.file) {
    req.body.captionPicture = await addPicture(req, "task");
  }
  await Topic.findOneAndUpdate(
    { _id: topicId },
    { totalTasks: topic.totalTasks + 1 }
  );
  const newTask = await Task.create({
    ...req.body,
    topic: topicId,
  });
  if (!newTask) {
    throw HttpError(500, `Creating failed`);
  }
  res.status(201).json(newTask);
};

export default addTaskToTopic;
