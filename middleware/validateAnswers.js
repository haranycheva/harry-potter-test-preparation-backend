import taskTypeSwitch from "../dispatchers/taskTypeSwitch.js";
import checkSchema from "../helpers/checkSchema.js";
import { InputAnswerValidationSchema, MatchAnswerValidationSchema, OptionsAnswerValidationSchema } from "../schema/user-answers/index.js";

const validateAnswers = (req, res, next) => {
    const validateInput = checkSchema.bind(null, InputAnswerValidationSchema, req, next)
    const validateOptions = checkSchema.bind(null, OptionsAnswerValidationSchema, req, next)
    const validateMatch = checkSchema.bind(null, MatchAnswerValidationSchema, req, next)
    taskTypeSwitch(req.body, validateInput, validateOptions, validateMatch)
    next();
  };
  
  export default validateAnswers;