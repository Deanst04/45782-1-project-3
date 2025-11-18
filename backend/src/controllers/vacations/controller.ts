import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Vacation from "../../models/Vacation";

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
        const vacation = await Vacation.create({...req.body})
        res.status(201).json(vacation)
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

        vacation.destination = req.body.destination
        vacation.description = req.body.description
        vacation.startDate = req.body.startDate
        vacation.endDate = req.body.endDate
        vacation.price = req.body.price
        vacation.imageUrl = req.body.imageUrl
        await vacation.save()
        res.json(vacation)
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
    } catch(e) {
        next(e)
    }

}

export async function getVacationsFollowersCount(req: Request, res: Response, next: NextFunction) {

    try {
        
        const vacations = await Vacation.findAll({
            include: {
                model: User,
                as: 'followers'
            }
        })

        const results = vacations.map(v => ({
            id: v.id,
            destination: v.destination,
            followersCount: v.followers?.length || 0
        }))

        res.json(results)

    } catch(e) {
        next(e)
    }

}