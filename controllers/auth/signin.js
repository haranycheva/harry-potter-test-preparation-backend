import {createToken, HttpError} from "../../helpers/index.js";
import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(409, "Email or password are invalid");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  
  if (!comparePassword) {
    throw HttpError(409, "Email or password are invalid");
  }
  const token = createToken(user)
  const newUser = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token: newUser.token,
    user: {
      email,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      progress: user.progress,
    },
  });
};

export default signin;
