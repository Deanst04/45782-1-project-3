import Joi from "joi";

export const createVacationValidator = Joi.object({
    destination: Joi.string().min(2).max(40).required(),
    description: Joi.string().min(10).max(300).required(),
    startDate: Joi.date().iso().min('now').required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    price: Joi.number().integer().min(1).max(10000).required(),
    imageUrl: Joi.string().required()
})

export const editVacationValidator = createVacationValidator.keys({
    startDate: Joi.date().iso().min('1900-01-01').required(),
    imageUrl: Joi.string().optional()
})

export const newVacationImageValidation = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid(
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/jpg'
        )
    }).unknown(true).optional()
})

export const editVacationImageValidation = newVacationImageValidation

export const idByParamsValidator = (paramName: string) => Joi.object({
    [paramName]: Joi.string().uuid().required()
})