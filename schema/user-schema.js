import Joi from "joi";
import { emailReg } from "../regex/regex.js";

export const userValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(28).required(),
  lastName: Joi.string().min(1).max(28).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailReg).required(),
});

export const editUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(28),
  lastName: Joi.string().min(1).max(28),
  progress: Joi.number().min(0).max(100),
});

export const signinValidationSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailReg).required(),
});
