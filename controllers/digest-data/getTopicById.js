import {HttpError} from "../../helpers/index.js";
import { Topic } from "../../models/Topic.js";

const getTopicById = async (req, res, next) => {
    const topicId = req.params.id;
    const result = await Topic.findOne({ _id: topicId});
    if (!result) {
      throw HttpError(404, `Can not find post with id = ${topicId}`);
    }
    res.json(result);
  };
  
  export default getTopicById;