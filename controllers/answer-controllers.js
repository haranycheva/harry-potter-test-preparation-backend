import {ctrlWrapper} from "../decorators/index.js"
import {sendTaskAnswers, sendTestAnswers} from "./answer/index.js"

export default {
    sendTestAnswers: ctrlWrapper(sendTestAnswers),
    sendTaskAnswers: ctrlWrapper(sendTaskAnswers),
}