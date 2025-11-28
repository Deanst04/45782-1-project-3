import './NotAllowed.css'
import { useNavigate } from 'react-router-dom'
import useTitle from '../../../hooks/use-title'
import useRole from '../../../hooks/use-role'

export default function NotAllowed() {

    useTitle('Not Allowed')
    const role = useRole()
    const navigate = useNavigate()

    const target = role === 'admin' ? '/admin' : '/user'
    const label = role === 'admin' ? 'back to admin page' : 'back to vacations'

    return (
        <div className='NotAllowed'>
            <div className='na-up'>🕵️‍♂️ Nice try, FBI agent, but you can’t enter here</div>
            <div className='na-content'>
                <h1 className='na-title'>403</h1>
                <p className='na-sub'>you are not allowed to enter this page</p>
                <button onClick={() => navigate(`${target}`)} className='na-btn'>
                    {label}
                </button>
            </div>
        </div>
    )
}