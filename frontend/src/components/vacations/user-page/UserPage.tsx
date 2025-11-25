import { useEffect, useState } from 'react'
import useTitle from '../../../hooks/use-title'
import './UserPage.css'
import useService from '../../../hooks/use-service'
import VacationServices from '../../../services/auth-aware/VacationServices'
import VacationCard from '../vacation-card/VacationCard'
import Spinner from '../../common/spinner/Spinner'
import Pagination from '@mui/material/Pagination';
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks'
import { init, toggleLike } from '../../../redux/vacation-slice'
import FollowsServices from '../../../services/auth-aware/FollowsServices'

export default function UserPage() {

    useTitle('User Page')

    const vacationServices = useService(VacationServices)
    const followService = useService(FollowsServices)
    const vacations = useAppSelector(state => state.vacationSlice.vacations)
    const dispatch = useAppDispatcher()

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
                if(vacations.length === 0) {
                    const vacationsFromServer = await vacationServices.getVacations()
                    dispatch(init(vacationsFromServer))
                }
            } catch(e) {
                alert(e)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [vacations.length, dispatch])

    useEffect(() => {
        if(vacations.length > 0) {
            const totalPages = Math.ceil(vacations.length / vacPerPage)

            if(page > totalPages) {
                setPage(totalPages)
            }
        }
    }, [vacations.length])

    async function toggleFollow(id: string) {

        const targetVac = vacations.find(v => v.id === id)
        if(!targetVac) return

        try {
            if(targetVac.isFollowed) {
                console.log(`you just unlike:`, id)
                await followService.unfollow(id)
                dispatch(toggleLike(id))
            } else {
                console.log(`you just liked:`, id)
                await followService.follow(id)
                dispatch(toggleLike(id))
            }
            console.log('toggled successfully')
        } catch(e) {
            alert(e)
        }
    }

    

    return (
        <div className='UserPage'>
            {isLoading && <Spinner /> }

            {!isLoading && vacations.length > 0 && <>
                <div className={`vacation-grid ${animState}`}>
                    {vacationToShow.map(v => (
                        <VacationCard
                            key={v.id}
                            vacation={v}
                            role='user'
                            onToggleFollow={toggleFollow}
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
