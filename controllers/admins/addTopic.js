import { HttpError } from "../../helpers/index.js";
import { Topic } from "../../models/Topic.js";

const addTopic = async (req, res) => {
  const { name, number } = req.body;
  console.log(name, number )
  const topic = await Topic.findOne({number});
  if (topic){
    throw HttpError(409, "Topic with that number already exists");
  }
  const newTopic = await Topic.create({ name, number, totalTasks: 0 });
  if (!newTopic) {
    throw HttpError(500, `Creating failed`);
  }
  res.status(201).json(newTopic);
};

export default addTopic;
