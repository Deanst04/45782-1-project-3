import './Signup.css'
import { useForm } from 'react-hook-form';
import AuthContext from '../auth/AuthContext';
import { useContext } from 'react';
import authService from '../../../services/auth';
import type SignupModel from '../../../models/signup';

export default function Signup() {

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
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='first name' required {...register('firstName')} />
                <input placeholder='last name' required {...register('lastName')} />
                <input type="email" placeholder='email' required {...register('email')} />
                <input type="password" placeholder='password' required {...register('password')} />
                <button>signup</button>
            </form>
        </div>
    )

}