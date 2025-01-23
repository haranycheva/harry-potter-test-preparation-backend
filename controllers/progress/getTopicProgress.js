import { TopicProgress } from "../../models/TopicProgress.js";
import {HttpError} from "../../helpers/index.js";

const getTopicProgress = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { topicId } = req.params;
  const topicProgress = await TopicProgress.findOne({
    owner: userId,
    topic: topicId,
  });
  if (!topicProgress) {
    throw HttpError(
      404,
      `Can not find progress for topic with id: ${topicId}`
    );
  }
  const { completedTasks, owner, topic } = topicProgress;
  res.json({ completedTasks, owner, topic });
};

export default getTopicProgress;
