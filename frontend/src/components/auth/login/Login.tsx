import { useContext } from 'react';
import type LoginModel from '../../../models/login';
import authService from '../../../services/auth';
import './Login.css'
import { useForm } from 'react-hook-form';
import AuthContext from '../auth/AuthContext';
import { NavLink } from 'react-router-dom';
import useTitle from '../../../hooks/use-title';

export default function Login() {

    useTitle('Login Page')

    const { register, handleSubmit } = useForm<LoginModel>();

    const authContext = useContext(AuthContext)

    async function submit(login: LoginModel) {

        try {
            const { jwt } = await authService.login(login)
            authContext?.newJwt(jwt)
            alert('logged in successfully')
        } catch(e) {
            alert(e)
        }

    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(submit)}>
                <div className='field'>
                <label>Email</label>
                <input type="email" placeholder='example@mail.com' required {...register('email')} />
                </div>
                <div className='field'>
                <label>Password</label>
                <input type="password" placeholder='password' required {...register('password')} />
                </div>
                <button>login</button>
            </form>
            <p className='go-signup'>
                Don't have an account? <NavLink to="/signup">signup now</NavLink>
            </p>
        </div>
    )

}