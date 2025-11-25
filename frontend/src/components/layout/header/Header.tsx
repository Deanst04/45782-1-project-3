import { useContext } from 'react'
import './Header.css'
import AuthContext from '../../auth/auth/AuthContext'
import useFirstName from '../../../hooks/use-username'
import { useNavigate } from 'react-router-dom'
import { useAppDispatcher } from '../../../redux/hooks'
import { reset } from '../../../redux/vacation-slice'

export default function Header() {

    const authContext = useContext(AuthContext)

    const name = useFirstName()

    const dispatch = useAppDispatcher()

    const navigate = useNavigate()

    function logout() {
        authContext?.newJwt('')
        dispatch(reset())
        navigate('/')
    }

    return (
        <div className='Header'>
            <div className="logo">FunFly</div>

            <div className="user-area">
                welcome {name}
                <button className="logout-btn" onClick={logout}>logout</button>
            </div>
        </div>
    )

}