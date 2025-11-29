import { error } from "console"
import User from "../models/User"
import Vacation from "../models/Vacation"


export default async function getStats() {

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

        return results
    } catch(e) {
        console.log(e)
        throw new error(e)
    }

}