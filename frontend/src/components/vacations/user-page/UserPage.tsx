import { useEffect, useState } from 'react'
import useTitle from '../../../hooks/use-title'
import './UserPage.css'
import useService from '../../../hooks/use-service'
import VacationServices from '../../../services/auth-aware/VacationServices'
import VacationCard from '../vacation-card/VacationCard'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks'
import { init, likeVacation, unlikeVacation } from '../../../redux/vacation-slice'
import FollowsServices from '../../../services/auth-aware/FollowsServices'
import Filter, { type FilterType } from '../../common/filter/Filter'
import VacationsPagination from '../../common/vacations-pagination/VacationsPagination'
import usePagination from '../../../hooks/use-pagination'

export default function UserPage() {

    useTitle('User Page')

    const vacationServices = useService(VacationServices)
    const followService = useService(FollowsServices)
    const vacations = useAppSelector(state => state.vacationSlice.vacations)
    const dispatch = useAppDispatcher()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [animState, setAnimState] = useState<"fade-in" | "fade-out">("fade-in");

    const [filter, setFilter] = useState<FilterType>("all")
    const now = new Date()

    const filteredVacations = vacations.filter(v => {
        const startDate = new Date(v.startDate)
        const endDate = new Date(v.endDate)

        if(filter === 'all') return true

        if(filter === 'followed') return v.isFollowed === true

        if(filter === 'upcoming') return startDate > now

        if(filter === 'active') return now >= startDate && now <= endDate

        return true
    })

    const { page, setPage, vacationToShow, totalPages } = usePagination(filteredVacations, 10)


    useEffect(() => {
        (async () => {
            try {
                if(vacations.length === 0) {
                    const vacationsFromServer = await vacationServices.getVacations()
                    dispatch(init(vacationsFromServer))
                }
                setIsLoading(false)
            } catch(e) {
                alert(e)
            }
        })()
    }, [vacations.length, dispatch])



    async function toggleFollow(id: string) {

        const targetVac = vacations.find(v => v.id === id)
        if(!targetVac) return

        try {
            if(targetVac.isFollowed) {
                console.log(`you just unlike:`, id)
                await followService.unfollow(id)
                dispatch(unlikeVacation({ vacationId: id, isSelf: true }))
            } else {
                console.log(`you just liked:`, id)
                await followService.follow(id)
                dispatch(likeVacation({ vacationId: id, isSelf: true }))
            }
            console.log('toggled successfully')
        } catch(e) {
            alert(e)
        }
    }

    function filterVacations(filter: FilterType) {
        setFilter(filter)
        setPage(1)
    }

    

    return (
        <div className='UserPage'>
            {isLoading && <Spinner /> }

            {!isLoading && vacations.length > 0 && <>
            <h1>Vacations</h1>
            <div className='user-panel-actions'>
                <Filter 
                    value={filter}
                    onChange={filterVacations}
                />
            </div>
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

                <div className='pagination-user'>
                    <VacationsPagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                        setAnimState={setAnimState}
                    />
                </div>
            </>
            }
        </div>
    )

}
