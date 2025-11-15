import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(4).max(200).required()
})

export const signupValidator = Joi.object({
    firstName: Joi.string().max(10).required(),
    lastName: Joi.string().max(20).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(4).max(200).required()
})