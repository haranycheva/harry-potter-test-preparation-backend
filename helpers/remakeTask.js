import { taskTypeSwitch } from "../decorators/index.js"
import {remakeInput, remakeMatch, remakeOptions} from "./task-remakers/index.js"

const remakeTask = async (task) => {
    return await taskTypeSwitch(task, remakeInput, remakeOptions, remakeMatch)
}


export default remakeTask