import { HttpError } from "../helpers/index.js";
import {
  InputTaskValidationSchema,
  MatchTaskValidationSchema,
  OptionTaskValidationSchema,
} from "../schema/admins/task/index.js";
const validateTask = (req, res, next) => {
  const type = req.body.type;
  switch (type) {
    case "input":
      checkSchema(InputTaskValidationSchema, req, next);
      break;
    case "options":
      checkSchema(OptionTaskValidationSchema, req, next);
      break;
    case "input":
      checkSchema(MatchTaskValidationSchema, req, next);
      break;
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
