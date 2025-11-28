import { useEffect, useState } from 'react'
import './AdminPage.css'
import useTitle from '../../../hooks/use-title'
import useService from '../../../hooks/use-service'
import VacationServices from '../../../services/auth-aware/VacationServices'
import AdminServices from '../../../services/auth-aware/AdminServices'
import VacationCard from '../vacation-card/VacationCard'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks'
import { deleteVacation, init } from '../../../redux/vacation-slice'
import usePagination from '../../../hooks/use-pagination'
import VacationsPagination from '../../common/vacations-pagination/VacationsPagination'

export default function AdminPage() {
    

    useTitle('Admin Panel')

    const vacationServices = useService(VacationServices)
    const adminServices = useService(AdminServices)
    const vacations = useAppSelector(state => state.vacationSlice.vacations)
    const dispatch = useAppDispatcher()

    const { page, setPage, vacationToShow, totalPages } = usePagination(vacations, 10)

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [animState, setAnimState] = useState<"fade-in" | "fade-out">("fade-in");

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
    }, [dispatch, vacations.length])


    async function removeVacation(id: string) {
        try {
            await adminServices.deleteVacation(id)
            dispatch(deleteVacation(id))
        } catch(e) {
            alert(e)
        }
    }

    function editVacation(id: string) {
        navigate(`/admin/edit/${id}`)
    }

    return (
        <div className='AdminPage'>
            {isLoading && <Spinner />}

            {!isLoading && vacations.length > 0 && <>
            <h1>Admin Panel</h1>
            <div className='admin-panel-actions'>
            <button className='add-vac' onClick={() => navigate('/admin/add-vacation')}>add vacation</button>
            <button className='graph-btn' onClick={() => navigate('/admin/graph')}>view graph</button>
            <button className='csv-btn'>export csv</button>
            </div>
            <div className={`vacation-grid ${animState}`}>
                {vacationToShow.map(v => (
                    <VacationCard
                        key={v.id}
                        vacation={v}
                        role='admin'
                        onDelete={removeVacation}
                        onEdit={editVacation}
                    />
                ))}
            </div>

            <div className='pagination-admin'>
                <VacationsPagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    setAnimState={setAnimState}
                />
            </div>
            </>}
        </div>
    )

}