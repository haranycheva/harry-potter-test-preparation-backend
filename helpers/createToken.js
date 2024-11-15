import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const createToken = (user) => {
    const payload = {
        id: user._id,
      };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    return token;
}

export default createToken