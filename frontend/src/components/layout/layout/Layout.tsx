import { useContext } from 'react'
import Header from '../header/Header'
import Main from '../main/Main'
import './Layout.css'
import AuthContext from '../../auth/auth/AuthContext'
import Login from '../../auth/login/Login'

export default function Layout() {

    const authContext = useContext(AuthContext)

    const isLoggedIn = !!authContext?.jwt

    return (
        <div className='Layout'>

            {!isLoggedIn && <Login />}

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