import Joi from "joi";

export const createVacationValidator = Joi.object({
    destination: Joi.string().min(2).max(40).required(),
    description: Joi.string().min(10).max(300).required(),
    startDate: Joi.date().iso().min('now').required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    price: Joi.number().integer().min(1).max(10000).required()
})

function makeAllOptional(schema: Joi.ObjectSchema) {
    return schema.fork(Object.keys(schema.describe().keys), f => f.optional());
}

export const editVacationValidator = makeAllOptional(createVacationValidator)
    .keys({
        // allow editing vacations with past start dates
        startDate: Joi.date().iso().min('2000-01-01').optional(),
        endDate: Joi.date().iso().min(Joi.ref('startDate')).optional()
    })
    .min(1);

export const newVacationImageValidation = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid(
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/jpg'
        ),
        size: Joi.number().max(3 * 1024 * 1024)
    }).unknown(true).required()
})

export const editVacationImageValidation = newVacationImageValidation.fork(
    ['image'],
    field => field.optional()
);

export const idByParamsValidator = (paramName: string) => Joi.object({
    [paramName]: Joi.string().uuid().required()
})