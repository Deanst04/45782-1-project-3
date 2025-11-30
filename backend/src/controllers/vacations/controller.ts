import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Vacation from "../../models/Vacation";
import socket from "../../io/io";
import SocketMessages from "socket-enums-deanst-vacations";
import { json2csv } from "json-2-csv";
import getStats from "../../common/vacation-stats";
import { deleteImage } from "../../aws/aws";

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

        if(!req.imageKey) {
            return next({
                status: 400,
                message: "Image is required"
            });
        }

        const newVacation = await Vacation.create({
            ...req.body,
            imageName: req.imageKey
        })

        await newVacation.reload()

        socket.emit(SocketMessages.NewVacation, {
            from: req.get('x-client-id') || 'server',
            vacation: newVacation
        })

        res.status(201).json(newVacation)

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

        const data = req.body

        const oldImage = vacation.imageName
        const newImage = req.imageKey

        if(newImage) {

            if(oldImage && oldImage.startsWith('vacations/')) {

                try {
                    await deleteImage(oldImage)
                } catch(e) {
                    console.log("Failed to delete previous image:", e)
                }

            }

            data.imageName = newImage

        } else {

            data.imageName = oldImage

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

        const vacation = await Vacation.findByPk(vacationId)

        if (!vacation) {
            return next({
                status: 404,
                message: "Vacation not found."
            });
        }

        const imageName = vacation.imageName

        if (imageName && imageName.startsWith('vacations/')) {

            try {
                await deleteImage(imageName)
            } catch(e) {
                console.log("Failed to delete image from S3:", e);
            }
        }

        await Vacation.destroy({ where: { id: vacationId } })
        // if (deletedRows === 0) return next({
        //     status: 404,
        //     message: 'No vacation found to delete.'
        // })

        socket.emit(SocketMessages.VacationDeleted, {
            from: req.get('x-client-id') || 'server',
            vacationId
        })

        res.json({ success: true })

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