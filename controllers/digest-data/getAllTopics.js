import { HttpError } from "../../helpers/index.js";
import { Topic } from "../../models/Topic.js";

const getAllTopics = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const totalTopics = await Topic.countDocuments()
  const result = await Post.Topic({}, "", {
    skip: (page - 1) * limit,
    limit,
  });
  if (!result) {
    throw HttpError(404, `Can not find any topics`);
  }
  res.json({result: result, total: totalTopics});
};

export default getAllTopics;
