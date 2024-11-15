import { addPicture, HttpError } from "../../helpers/index.js";
import { User } from "../../models/User.js";

const redactUser = async (req, res, next) => {
  const { _id } = req.user;
  if (req.body.password || req.body.email) {
    throw HttpError(400, `Password or email can't be changed`);
  }
  if (req.file) {
    req.body.avatar = await addPicture(req, "user");
  }
  const editedUser = await User.findOneAndUpdate(
    { _id },
    { ...req.body }
  ).select("-password -token");
  if (!editedUser) {
    throw HttpError(404, `Can not find a user with id ${id}`);
  }
  res.json(editedUser);
};

export default redactUser;
