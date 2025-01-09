import {HttpError} from "../../helpers/index.js";
import { AiChat } from "../../models/AiChat.js";
import { getAiMessage } from "../../openAi/index.js";

const sendMessageToAi = async (req, res, next) => {
  const { message: userMessage } = req.body;
  const user = req.user;
  const aiChat = await AiChat.findOne({ owner: user._id });
  if (!aiChat) {
    throw HttpError(404, "User`s chat does not exist");
  }
  const userMessageObj = { content: userMessage, role: "user" };
  const aiAnswer = await getAiMessage(
    [...aiChat.messagesForAi, userMessageObj],
  );
  const updatedAiChat = await AiChat.findByIdAndUpdate(
    { owner: user._id, _id: aiChat._id },
    {
      $push: {
        messages: { $each: [userMessageObj, aiAnswer] },
        messagesForAi: { $each: [userMessageObj, aiAnswer] },
      },
    }
  ).select("-messagesForAi");
  if (!updatedAiChat) {
    throw HttpError(500, "Can not send message");
  }
  res.json(aiAnswer);
};

export default sendMessageToAi;
