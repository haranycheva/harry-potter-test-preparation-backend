import { User } from "../../models/User.js";
import { HttpError } from "../index.js";

const updateUserProgress = async (userId, progress) => {
  const user = await User.findById(userId);
  if (!user) {
    throw HttpError(404, `Can not find user with id: ${userId}`);
  }
  if (user.progress < progress) {
    const updatedUser = await User.findByIdAndUpdate(userId, {progress})
    if (!updatedUser) {
        throw HttpError(500, `Can not update user's progress with id: ${userId}`);
      }
  }
};

export default updateUserProgress;
