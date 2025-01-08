import { taskTypeSwitch } from "../../dispatchers/index.js"
import {remakeInput, remakeMatch, remakeOptions} from "./index.js"

const remakeTask = async (task) => {
    return await taskTypeSwitch(task, remakeInput, remakeOptions, remakeMatch)
}


export default remakeTask