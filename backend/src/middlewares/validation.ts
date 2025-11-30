import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validation(
    validator: ObjectSchema,
    target: "body" | "params" | "query" | "files" = "body"
) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            let value = req[target];

            // Ensure target always exists (avoid "value must be of type object")
            if (value === undefined || value === null) {
                value = {};
            }

            // Allow Joi to convert types (string → number, string → date etc.)
            const validated = await validator.validateAsync(value, {
                abortEarly: false,
                convert: true
            });

            req[target] = validated;
            next();

        } catch (e: any) {
            next({
                status: 422,
                message: e.message
            });
        }
    };
}