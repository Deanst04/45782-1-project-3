import { useEffect, useState } from 'react'
import useTitle from '../../../hooks/use-title'
import './UserPage.css'
import type Vacation from '../../../models/vacation'
import useService from '../../../hooks/use-service'
import VacationServices from '../../../services/auth-aware/VacationServices'
import VacationCard from '../vacation-card/VacationCard'
import Spinner from '../../common/spinner/Spinner'
import Pagination from '@mui/material/Pagination';

export default function UserPage() {

    useTitle('User Page')

    const vacationServices = useService(VacationServices)

    const [vacations, setVacations] = useState<Vacation[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [animState, setAnimState] = useState<"fade-in" | "fade-out">("fade-in");
    const vacPerPage = 10

    const startIndex = (page - 1) * vacPerPage
    const endIndex = startIndex + vacPerPage
    const vacationToShow = vacations.slice(startIndex, endIndex)

    useEffect(() => {
        (async () => {

            try {
                const vacations = await vacationServices.getVacations()
                setVacations(vacations)
            } catch(e) {
                alert(e)
            } finally {
                setIsLoading(false)
            }

        })()
    }, [])

    useEffect(() => {
        if(vacations.length > 0) {
            const totalPages = Math.ceil(vacations.length / vacPerPage)

            if(page > totalPages) {
                setPage(totalPages)
            }
        }
    }, [vacations])

    return (
        <div className='UserPage'>
            {isLoading && <Spinner /> }

            {!isLoading && <>
                <div className={`vacation-grid ${animState}`}>
                    {vacationToShow.map(v => (
                        <VacationCard
                            key={v.id}
                            vacation={v}
                        />
                    ))}
                </div>

                <div className='pagination-wrapper'>
                        <Pagination 
                            count={Math.ceil(vacations.length / vacPerPage)}
                            page={page}
                            onChange={(_, value) => {
                            setAnimState("fade-out")
                
                            setTimeout(() => {
                                setPage(value);
                                setAnimState("fade-in");
                                }, 200);  // 200ms fade-out then update
                            }}
                            color="primary"
                            size="large"
                            variant="outlined"
                            shape="rounded"
                        />
                </div>
            </>
            }
        </div>
    )

}
