import { User } from "../../models/User.js";

const getInfo = async(req, res, next) => {
    const { _id } = req.user;
    const user = await User.findById(_id, "-password -token");
    res.json({user})
}

export default getInfo