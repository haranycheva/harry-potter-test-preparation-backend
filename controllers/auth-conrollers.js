import {ctrlWrapper} from "../decorators/index.js"
import { getInfo, logout, redactUser, signin, signup } from './auth/index.js'

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getInfo: ctrlWrapper(getInfo),
    logout: ctrlWrapper(logout),
    redactUser: ctrlWrapper(redactUser),
}