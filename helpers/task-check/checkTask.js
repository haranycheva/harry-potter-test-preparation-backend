import { taskTypeSwitch } from "../../dispatchers/index.js"
import {checkInput, checkMatch, checkOptions} from "./index.js"

const checkTask = async(task) => {
    return await taskTypeSwitch(task, checkInput, checkOptions, checkMatch)
}

export default checkTask