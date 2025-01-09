import { HttpError } from "../../helpers/index.js";
import { AiChat } from "../../models/AiChat.js";
import { defaultReq } from "../../openAi/defaults.js";
import { getAiMessage } from "../../openAi/index.js";

const createAiChat = async (req, res) => {
  const user = req.user;
  const aiChat = await AiChat.findOne({ owner: user._id });
  if (aiChat) {
    throw HttpError(409, "User already has an AI chat");
  }

  const aiAnswer = await getAiMessage([]);
  const newAiChat = await AiChat.create({
    messages: [aiAnswer],
    messagesForAi: [
      {
        role: "system",
        content: defaultReq,
      },
    ],
    owner: user._id,
  });
  if (!newAiChat) {
    throw HttpError(500, `Creating failed`);
  }
  res
    .status(201)
    .json({ messages: newAiChat.messages, owner: newAiChat.owner });
};

export default createAiChat;
