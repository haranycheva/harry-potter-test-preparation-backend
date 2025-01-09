import Joi from "joi";

const MatchAnswerValidationSchema = Joi.object({
  answer: Joi.array().items(
    Joi.object({
      condition: Joi.string().required(),
      answer: Joi.string().required(),
    }).required()
  ),
  _id: Joi.string().required(),
  type: Joi.string().valid("options"),
});

export default MatchAnswerValidationSchema;
