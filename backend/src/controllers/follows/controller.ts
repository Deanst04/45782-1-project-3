import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Vacation from "../../models/Vacation";
import Follow from "../../models/Follow";
import socket from "../../io/io";
import SocketMessages from "socket-enums-deanst-vacations";


export async function followVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {

    const userId = req.userId
    const vacationId = req.params.id

    try {

        const vacation = await Vacation.findByPk(vacationId)
        if(!vacation) return next({
            status: 404,
            message: 'Vacation not found'
        })

        const existing = await Follow.findOne({
            where: {
                userId,
                vacationId
            }
        })

        if(existing) return next({
            status: 422,
            message: 'You already follow this vacation'
        })

        const follow = await Follow.create({ userId, vacationId })

        res.status(201).json(follow)

        socket.emit(SocketMessages.VacationLiked, {
            from: req.get('x-client-id') || 'server',
            userId,
            vacationId
        })

    } catch(e) {
        next(e)
    }

}

export async function unfollowVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {

    const userId = req.userId
    const vacationId = req.params.id

    try {
        
        const follow = await Follow.findOne({
            where: {
                userId,
                vacationId
            }
        })

        if(!follow) return next({
            status: 422,
            message: 'You do not follow this vacation'
        })

        await follow.destroy()

        res.json({ success: true })

        socket.emit(SocketMessages.VacationUnliked, {
            from: req.get('x-client-id') || 'server',
            userId,
            vacationId
        })

    } catch(e) {
        next(e)
    }

}