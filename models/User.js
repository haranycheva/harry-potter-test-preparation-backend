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
      default: "https://res.cloudinary.com/dk3syrsg5/image/upload/v1731665163/zno-preparing-user/photo_2024-11-15_12-05-23_wrbes3.jpg"
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
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
