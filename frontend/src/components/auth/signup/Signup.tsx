import './Signup.css'
import { useForm } from 'react-hook-form';
import AuthContext from '../auth/AuthContext';
import { useContext } from 'react';
import authService from '../../../services/auth';
import type SignupModel from '../../../models/signup';
import { NavLink } from 'react-router-dom';
import useTitle from '../../../hooks/use-title';

export default function Signup() {

    useTitle('Signup Page')

    const { register, handleSubmit } = useForm<SignupModel>()

    const authContext = useContext(AuthContext)

    async function submit(signup: SignupModel) {

        try {
            const { jwt } = await authService.signup(signup)
            authContext?.newJwt(jwt)
            alert('signed in successfully')
        } catch(e) {
            alert(e)
        }

    }

    return (
        <div className='Signup'>
            <div className='signup-panel'>
            <form onSubmit={handleSubmit(submit)}>
                <div className='field'>
                <label>First Name</label>
                <input placeholder='John' required {...register('firstName')} />
                </div>
                <div className='field'>
                <label>Last Name</label>
                <input placeholder='Doe' required {...register('lastName')} />
                </div>
                <div className='field'>
                <label>Email</label>
                <input type="email" placeholder='example@mail.com' required {...register('email')} />
                </div>
                <div className='field'>
                <label>Password</label>
                <input type="password" placeholder='password' required {...register('password')} />
                </div>
                <button>signup</button>
            </form>
            <p className='go-login'>
                Already have an account? <NavLink to="/login">login now</NavLink>
            </p>
            </div>
        </div>
    )

}