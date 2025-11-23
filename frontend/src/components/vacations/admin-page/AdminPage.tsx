import { useEffect, useState } from 'react'
import './AdminPage.css'
import type Vacation from '../../../models/vacation'
import useTitle from '../../../hooks/use-title'
import useService from '../../../hooks/use-service'
import VacationServices from '../../../services/auth-aware/VacationServices'
import AdminServices from '../../../services/auth-aware/AdminServices'
import VacationCard from '../vacation-card/VacationCard'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../common/spinner/Spinner'
import Pagination from '@mui/material/Pagination';

export default function AdminPage() {

    useTitle('Admin Panel')

    const vacationServices = useService(VacationServices)
    const adminServices = useService(AdminServices)

    const navigate = useNavigate()

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

    async function removeVacation(id: string) {
        try {
            await adminServices.deleteVacation(id)
            setVacations(vacations.filter(v => v.id !== id))
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

            {!isLoading && <>
            <h1>Admin Panel</h1>
            <div className='admin-actions'>
            <button className='add-vac' onClick={() => navigate('/admin/add-vacation')}>add vacation</button>
            <button className='graph-btn' onClick={() => navigate('/admin/graph')}>view graph</button>
            <button className='csv-btn'>export csv</button>
            </div>
            <div className={`vacation-grid ${animState}`}>
                {vacationToShow.map(v => (
                    <VacationCard
                        key={v.id}
                        vacation={v}
                        onDelete={removeVacation}
                        onEdit={editVacation}
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
            </>}
        </div>
    )

}