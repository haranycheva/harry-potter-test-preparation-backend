import Joi from "joi"

const InputTaskValidationSchema = Joi.object({
    condition: Joi.string().min(1).required(),
    caption: Joi.string().min(1),
    possibleScore: Joi.number().required(),
    type: Joi.string().valid("input"),
    answer: Joi.string().min(1).required(),
    isTest: Joi.bool()
})

export default InputTaskValidationSchema