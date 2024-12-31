import Joi from "joi"

const OptionTaskValidationSchema = Joi.object({
    condition: Joi.string().min(1).required(),
    caption: Joi.string().min(1),
    possibleScore: Joi.number().required(),
    type: Joi.string().valid("options"),
    optionsQuant: Joi.number().required()
})

export default OptionTaskValidationSchema