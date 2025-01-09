import ctrlWrapper from "../decorators/ctrlWrapper.js"
import {getAiChat, createAiChat, sendMessageToAi, deleteAiChat} from "./ai/index.js"

export default {
    createAiChat: ctrlWrapper(createAiChat),
    sendMessageToAi: ctrlWrapper(sendMessageToAi),
    getAiChat: ctrlWrapper(getAiChat),
    deleteAiChat: ctrlWrapper(deleteAiChat),
}