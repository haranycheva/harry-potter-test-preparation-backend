import {ctrlWrapper} from "../decorators/index.js"
import { getTaskProgress, getTestProgress, getTopicProgress } from "./progress/index.js"

export default {
    getTopicProgress: ctrlWrapper(getTopicProgress),
    getTestProgress: ctrlWrapper(getTestProgress),
    getTaskProgress: ctrlWrapper(getTaskProgress),
}