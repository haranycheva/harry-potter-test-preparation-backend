import {HttpError} from "../../helpers/index.js";
import { AiChat } from "../../models/AiChat.js";

const getAiChat = async (req, res, next) => {
  const user = req.user;
  const aiChat = await AiChat.findOne({owner: user._id}).select("-messagesForAi")
  if(!aiChat){
    throw HttpError(404, `Can not find ai chat for user with id ${user._id}`)
  }
  res.json(aiChat)
};

export default getAiChat