import { useContext } from 'react'
import './Header.css'
import AuthContext from '../../auth/auth/AuthContext'
import useFirstName from '../../../hooks/use-username'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const authContext = useContext(AuthContext)

    const name = useFirstName()

    const navigate = useNavigate()

    function logout() {
        authContext?.newJwt('')
        navigate('/')
    }

    return (
        <div className='Header'>
            <div className="logo">logo</div>

            <div className="user-area">
                welcome {name}
                <button className="logout-btn" onClick={logout}>logout</button>
            </div>
        </div>
    )

}