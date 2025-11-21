import { useContext } from 'react'
import Header from '../header/Header'
import Main from '../main/Main'
import './Layout.css'
import AuthContext from '../../auth/auth/AuthContext'
import Login from '../../auth/login/Login'
import { useLocation } from 'react-router-dom'
import Signup from '../../auth/signup/Signup'

export default function Layout() {

    const authContext = useContext(AuthContext)

    const isLoggedIn = !!authContext?.jwt

    const location = useLocation()

    const isSignupPage = location.pathname === '/signup'

    return (
        <div className='Layout'>

            {!isLoggedIn && (
                isSignupPage ? <Signup /> : <Login />
            )}

            {isLoggedIn && 
                <>
                    <header>
                        <Header />
                    </header>

                    <main>
                        <Main />
                    </main>
                </>
            }
            
        </div>
    )
}