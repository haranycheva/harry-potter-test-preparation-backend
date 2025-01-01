import HttpError from "../../helpers/HttpError.js";
import { Task } from "../../models/Task.js";

const getTaskById = async (req, res, next) => {
    const taskId = req.params.id;
    const result = await Task.findOne({ _id: taskId});
    if (!result) {
      throw HttpError(404, `Can not find post with id = ${taskId}`);
    }
    res.json(result);
  };
  
  export default getTaskById;