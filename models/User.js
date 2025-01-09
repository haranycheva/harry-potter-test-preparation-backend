import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import { emailReg } from "../regex/regex.js";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 1,
      maxLength: 28,
      required: [true, "username is required"],
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 28,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      match: emailReg,
      unique: true,
      required: [true, "email is required"],
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dk3syrsg5/image/upload/v1734983002/harry-potter-cat-version-v0-0z3cpxqd80hc1_yho1wv.webp"
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    currentTopic:  {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "topic",
  },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);
userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const User = model("user", userSchema);
