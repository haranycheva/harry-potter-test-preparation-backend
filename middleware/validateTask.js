import { HttpError } from "../helpers/index.js";
import {
  InputTaskValidationSchema,
  MatchTaskValidationSchema,
  OptionTaskValidationSchema,
} from "../schema/admins/task/index.js";
const validateTask = (req, res, next) => {
  const type = req.body.type;
  console.log(type)
  if (type === "input") {
    checkSchema(InputTaskValidationSchema, req, next);
  } else if (type === "options") {
    checkSchema(OptionTaskValidationSchema, req, next); 
  } else if (type === "match") {
    checkSchema(MatchTaskValidationSchema, req, next);
  }
  next();
};

function checkSchema(schema, req, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }
}

export default validateTask;
