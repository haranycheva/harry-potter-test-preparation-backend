import {
  InputAnswerValidationSchema,
  MatchAnswerValidationSchema,
  OptionsAnswerValidationSchema,
} from "./index.js";
import Joi from "joi"

const testAnswersValidationSchema = Joi.object({
 userAnswers: Joi.array().items(
    Joi.alternatives().try(
      InputAnswerValidationSchema,
      OptionsAnswerValidationSchema,
      MatchAnswerValidationSchema
    )
  )
});

export default testAnswersValidationSchema;
