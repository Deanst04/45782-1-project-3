import { useEffect, useState } from 'react'
import './AdminPage.css'
import type Vacation from '../../../models/vacation'
import useTitle from '../../../hooks/use-title'
import useService from '../../../hooks/use-service'
import VacationServices from '../../../services/auth-aware/VacationServices'
import AdminServices from '../../../services/auth-aware/AdminServices'
import VacationCard from '../vacation-card/VacationCard'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {

    useTitle('Admin Panel')

    const vacationServices = useService(VacationServices)
    const adminServices = useService(AdminServices)

    const navigate = useNavigate()

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
            <h1>Admin Panel</h1>
            <div className='admin-actions'>
            <button className='add-vac' onClick={() => navigate('/admin/add-vacation')}>add vacation</button>
            <button className='graph-btn' onClick={() => navigate('/admin/graph')}>view graph</button>
            <button className='csv-btn'>export csv</button>
            </div>
            <div className='vacation-grid'>
                {vacations.map(v => (
                    <VacationCard
                        key={v.id}
                        vacation={v}
                        onDelete={removeVacation}
                        onEdit={editVacation}
                    />
                ))}
            </div>
        </div>
    )

}