import { NextFunction, Request, Response } from "express";
import config from 'config'
import { createHmac } from "crypto";
import { sign } from "jsonwebtoken";
import User from "../../models/User";

function hashAndSaltPassword(plainTextPassword: string) {
    const secret = config.get<string>('app.secret')
    console.log("HASH SECRET IN FUNCTION:", secret)
    return createHmac('sha256', secret).update(plainTextPassword).digest('hex')
}

export async function signup(req: Request, res: Response, next: NextFunction) {

    try {
        const jwtSecret = config.get<string>('app.jwtSecret')

        const existing = await User.findOne({ where: { email: req.body.email }})
        if(existing)  return next({
            status: 409,
            message: 'Email already exists. Please login instead.'
        })

        req.body.password = hashAndSaltPassword(req.body.password)
        const user = await User.create(req.body)
        const plainData = user.get({ plain: true })
        delete plainData.password
        const jwt = sign(plainData, jwtSecret)
        res.json({ jwt })
    } catch(e) {
        next(e)
    }

}

export async function login(req: Request, res: Response, next: NextFunction) {

    const jwtSecret = config.get<string>('app.jwtSecret')

    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: hashAndSaltPassword(req.body.password)
            }
        })
        if(!user) return next({
            status: 401,
            message: 'invalid email and/or password'
        })
        const plainData = user.get({ plain: true })
        delete plainData.password
        const jwt = sign(plainData, jwtSecret)
        res.json({ jwt })
    } catch(e) {
        next(e)
    }

}