import { useEffect, useState } from 'react'
import useTitle from '../../../hooks/use-title'
import './UserPage.css'
import type Vacation from '../../../models/vacation'
import useService from '../../../hooks/use-service'
import VacationServices from '../../../services/auth-aware/VacationServices'
import VacationCard from '../vacation-card/VacationCard'

export default function UserPage() {

    useTitle('User Page')

    const vacationServices = useService(VacationServices)

    const [vacations, setVacations] = useState<Vacation[]>([])

    useEffect(() => {
        (async () => {

            try {
                const vacations = await vacationServices.getVacations()
                setVacations(vacations)
            } catch(e) {
                alert(e)
            }

        })()
    }, [])

    return (
        <div className='UserPage'>
            {vacations.length === 0 && <div>loading vacations...</div> }

            {vacations.length > 0 && (
                <div className='vacation-grid'>
                    {vacations.map(v => (
                        <VacationCard
                            key={v.id}
                            vacation={v}
                        />
                    ))}
                </div>
            )}
        </div>
    )

}
