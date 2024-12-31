import Joi from "joi"

export const TopicValidationSchema = Joi.object({
    name: Joi.string().min(1).required(),
    number: Joi.number().required(),
})
