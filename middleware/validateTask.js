import {taskTypeSwitch} from "../decorators/index.js";
import { checkSchema } from "../helpers/index.js";
import {
  InputTaskValidationSchema,
  MatchTaskValidationSchema,
  OptionTaskValidationSchema,
} from "../schema/admins/task/index.js";

const validateTask = (req, res, next) => {
  const validateInput = checkSchema.bind(null, InputTaskValidationSchema, req, next)
  const validateOptions = checkSchema.bind(null, OptionTaskValidationSchema, req, next)
  const validateMatch = checkSchema.bind(null, MatchTaskValidationSchema, req, next)
  taskTypeSwitch(req.body, validateInput, validateOptions, validateMatch)
  next();
};

export default validateTask;
