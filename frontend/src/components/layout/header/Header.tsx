import { useContext } from 'react'
import './Header.css'
import AuthContext from '../../auth/auth/AuthContext'
import useFirstName from '../../../hooks/use-username'

export default function Header() {

    const authContext = useContext(AuthContext)

    const name = useFirstName()

    function logout() {
        authContext?.newJwt('')
    }

    return (
        <div className='Header'>
            <div>logo</div>
            <div>
                welcome {name} | <button onClick={logout}>logout</button>
            </div>
        </div>
    )

}