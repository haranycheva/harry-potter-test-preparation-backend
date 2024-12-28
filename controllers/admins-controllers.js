import {ctrlWrapper} from "../decorators/index.js"
import addOptions from "./admins/addOptions.js"
import addQuestions from "./admins/addQuestions.js"
import {addTaskToTopic, addTopic} from "./admins/index.js"

export default {
    addTaskToTopic: ctrlWrapper(addTaskToTopic),
    addTopic: ctrlWrapper(addTopic),
    addQuestions: ctrlWrapper(addQuestions),
    addOptions: ctrlWrapper(addOptions),
}