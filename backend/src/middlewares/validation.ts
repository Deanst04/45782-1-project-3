import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validation(validator: ObjectSchema, target: "body" | "params" | "query" | "files" = "body") {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            req[target] = await validator.validateAsync(req[target])
            next()
        } catch(e) {
            next({
                status: 422,
                message: e.message
            })
        }
    }
}