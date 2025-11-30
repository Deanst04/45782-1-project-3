import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Vacation from "../../models/Vacation";
import socket from "../../io/io";
import SocketMessages from "socket-enums-deanst-vacations";
import { json2csv } from "json-2-csv";
import getStats from "../../common/vacation-stats";

export async function getVacations(req: Request, res: Response, next: NextFunction) {

    try {
        const vacations = await Vacation.findAll({
            include: {
                model: User,
                as: 'followers',
                attributes: ["id"],
                through: { attributes: [] }
            },
            order: [["startDate", "ASC"]]
        })

        const final = vacations.map(v => {

            const plain = v.get({ plain: true })
            plain.followerCount = plain.followers.length
            plain.isFollowed = plain.followers.some(f => f.id === req.userId)

            delete plain.followers

            return plain

        })

        res.json(final)

    } catch(e) {
        next(e)
    }

}

export async function createVacation(req: Request, res: Response, next: NextFunction) {
    
    try {
        const newVacation = await Vacation.create({
            ...req.body,
            imageName: req.imageUrl
        })
        await newVacation.reload()
        res.status(201).json(newVacation)

        socket.emit(SocketMessages.NewVacation, {
            from: req.get('x-client-id') || 'server',
            vacation: newVacation
        })
    } catch(e) {
        next(e)
    }

}

export async function editVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {

    try {
        const vacation = await Vacation.findByPk(req.params.vacationId)

        if(!vacation) {
                return next({
                status: 404,
                message: "Vacation not found."
            });
        }

        const data = { ...req.body }

        if (req.imageUrl) {
            data.imageName = req.imageUrl;
        } else {
            data.imageName = vacation.imageName;
        }

        await vacation.update(data)
        await vacation.reload()
        console.log("UPDATED VACATION:", vacation);
        res.json(vacation)

        socket.emit(SocketMessages.UpdateVacation, {
            from: req.get('x-client-id') || 'server',
            vacation
        })
    } catch(e) {
        next(e)
    }

}

export async function deleteVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {

    try {
        const { vacationId } = req.params
        const deletedRows = await Vacation.destroy({ where: { id: vacationId } })
        if (deletedRows === 0) return next({
            status: 404,
            message: 'No vacation found to delete.'
        })
        res.json({ success: true })

        socket.emit(SocketMessages.VacationDeleted, {
            from: req.get('x-client-id') || 'server',
            vacationId
        })
    } catch(e) {
        next(e)
    }

}

export async function getVacationsFollowersCount(req: Request, res: Response, next: NextFunction) {

    try {
        
        const results = await getStats()
        res.json(results)

    } catch(e) {
        next(e)
    }

}

export async function generateCsv(req: Request, res: Response, next: NextFunction) {

    try {

        const results = await getStats()
        const csv = await json2csv(results)

        res.header('Content-Type', 'text/csv')
        res.attachment('vacation-stats.csv')
        res.send(csv)

    } catch(e) {
        next({
            message: 'Error converting JSON to CSV',
            details: e
        })
    }

}