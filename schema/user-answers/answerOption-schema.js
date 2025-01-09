import Joi from "joi"

const OptionsAnswerValidationSchema = Joi.object({
    selectedOptionId: Joi.string().required(),
    _id: Joi.string().required(),
    type: Joi.string().valid("options"),
})

export default OptionsAnswerValidationSchema