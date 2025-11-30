import Joi from "joi";

export const createVacationValidator = Joi.object({
    destination: Joi.string().min(2).max(40).required(),
    description: Joi.string().min(10).max(300).required(),
    startDate: Joi.date().iso().min('now').required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    price: Joi.number().integer().min(1).max(10000).required()
})

const makeOptional = schema => schema.optional()

export const editVacationValidator = createVacationValidator
.fork(['destination', 'description', 'startDate', 'endDate', 'price'], makeOptional)
.keys({
    startDate: Joi.date().iso().min('1900-01-01')
})
.min(1)

export const newVacationImageValidation = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid(
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/jpg'
        )
    }).unknown(true).required()
})

export const editVacationImageValidation = newVacationImageValidation.fork(
    ['image'], makeOptional
)

export const idByParamsValidator = (paramName: string) => Joi.object({
    [paramName]: Joi.string().uuid().required()
})