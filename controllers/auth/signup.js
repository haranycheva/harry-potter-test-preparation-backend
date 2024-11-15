import { addPicture, createToken, HttpError } from "../../helpers/index.js";
import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";

const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exists");
  }
  if (!password || password.length < 6) {
    throw HttpError(409, "Password must be more than 6 symbols");
  }
  if (req.file) {
    req.body.avatar = await addPicture(req, "user");
  }
  const pass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: pass,
    avatar: req.body.avatar,
  }).then((res) => {
    const token = createToken(res);
    return User.findByIdAndUpdate(res._id, { token });
  });
  res.status(201).json({
    token: newUser.token,
    user: {
      email,
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      avatar: newUser.avatar,
      progress: newUser.progress,
    },
  });
};

export default signup;
