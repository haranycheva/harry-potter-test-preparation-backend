import Joi from "joi"

const MatchTaskValidationSchema = Joi.object({
    condition: Joi.string().min(1).required(),
    caption: Joi.string().min(1),
    possibleScore: Joi.number().required(),
    type: Joi.string().valid("match"),
    questionsQuant: Joi.number().required(),
    oddAnswer: Joi.array().items(Joi.string().required())
})

export default MatchTaskValidationSchema