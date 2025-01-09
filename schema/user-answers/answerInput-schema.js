import Joi from "joi"

const InputAnswerValidationSchema = Joi.object({
    answer: Joi.string().required(),
    _id: Joi.string().required(),
    type: Joi.string().valid("input"),
})

export default InputAnswerValidationSchema