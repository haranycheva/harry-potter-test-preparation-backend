import { HttpError } from "../../helpers/index.js"
import { AiChat } from "../../models/AiChat.js"

const deleteAiChat = async(req, res, next) => {
    const user = req.user
    const deleted = await AiChat.deleteOne({owner: user._id})
    if(!deleted.deletedCount){
        throw HttpError(400, `Can not can not delete ai chat for user ${user._id}`)
    }
    res.json({message: "success"})
}

export default deleteAiChat