import { useNavigate } from 'react-router-dom'
import useTitle from '../../../hooks/use-title'
import './NotFound.css'
import useRole from '../../../hooks/use-role'

export default function NotFound() {

    useTitle('404')
    const role = useRole()
    const navigate = useNavigate()

    const target = role === 'admin' ? '/admin' : '/user'
    const label = role === 'admin' ? 'back to admin page' : 'back to vacations'

    return (
        <div className='NotFound'>
            <div className='nf-plane'>✈️ You navigated like a Ryanair pilot</div>
            <div className='notfound-content'>
                <h1 className='nf-title'>404</h1>
                <p className='nf-sub'>not found, where is your head?</p>
                <button onClick={() => navigate(`${target}`)} className='nf-btn'>
                    {label}
                </button>
            </div>
        </div>
    )
}