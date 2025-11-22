import { useEffect, useState } from 'react';
import './Graph.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import type VacationFollowersCount from '../../../../models/vacation-followed-count';
import useService from '../../../../hooks/use-service';
import AdminServices from '../../../../services/auth-aware/AdminServices';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../common/spinner/Spinner';

export default function Graph() {

    const adminServices = useService(AdminServices)

    const [vacationStats, setVacationStats] = useState<VacationFollowersCount[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const vacationStats = await adminServices.getVacationFollowersCount()
                setVacationStats(vacationStats)
            } catch(e) {
                alert(e)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    function splitDestination(destination: string): { city: string, country: string } {
        const parts = destination.split(',')
        const city = parts[0]?.trim() || ''
        const country = parts[1]?.trim() || ''
        return { city, country }
    } 

    const graphData = vacationStats.map(v => {
        const { city, country } = splitDestination(v.destination)
        return {...v, city, country}
    })

    return (
        <div className='Graph'>
            {isLoading && <Spinner />}

            {!isLoading && <>
            <h1>Vacation Followers Statistics</h1>
            <button className='back-btn' onClick={() => navigate('/admin')}>
                Back to admin page
            </button>
            <ResponsiveContainer width='100%' height={400}>
                <BarChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis 
                        dataKey='city'
                        interval={0}
                        angle={0}
                        textAnchor="middle"
                        height={80}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip 
                        contentStyle={{ 
                            borderRadius: 8, 
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }}
                    />
                    <Legend />
                    <Bar 
                        dataKey='followersCount' 
                        fill="#3b82f6" 
                        name="Followers" 
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
            </>}
        </div>
    )

}