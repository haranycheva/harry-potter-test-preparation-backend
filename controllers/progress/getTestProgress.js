import { TestProgress } from "../../models/TestProgress.js";
import {HttpError} from "../../helpers/index.js";

const getTestProgress = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { topicId } = req.params;
  const testProgress = await TestProgress.findOne({
    owner: userId,
    topic: topicId,
  });
  if (!testProgress) {
    throw HttpError(
      404,
      `Can not find test progress for topic with id: ${topicId}`
    );
  }
  const { maxScore, owner, topic } = testProgress;
  res.json({ maxScore, owner, topic });
};

export default getTestProgress;
