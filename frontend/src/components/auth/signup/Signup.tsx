import './Signup.css';
import { useForm } from 'react-hook-form';
import AuthContext from '../auth/AuthContext';
import { useContext } from 'react';
import authService from '../../../services/auth';
import type SignupModel from '../../../models/signup';
import { NavLink, useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/use-title';

export default function Signup() {

    useTitle('Signup Page');

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<SignupModel>();

    const authContext = useContext(AuthContext);

    async function submit(signup: SignupModel) {

        try {
            const { jwt } = await authService.signup(signup);
            authContext?.newJwt(jwt);
            alert('signed in successfully');
            navigate('/user');
        } catch (e) {
            alert(e);
        }

    }

    return (
        <div className='Signup'>
            <div className='signup-panel'>
                
                <form onSubmit={handleSubmit(submit)}>

                    <div className='field'>
                        <label>First Name</label>
                        <input 
                            placeholder='John'
                            {...register('firstName', {
                                required: 'First name is required',
                                maxLength: { value: 10, message: 'Max 10 chars' }
                            })} 
                        />
                        {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                    </div>

                    <div className='field'>
                        <label>Last Name</label>
                        <input 
                            placeholder='Doe'
                            {...register('lastName', {
                                required: 'Last name is required',
                                maxLength: { value: 20, message: 'Max 20 chars' }
                            })} 
                        />
                        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                    </div>

                    <div className='field'>
                        <label>Email</label>
                        <input 
                            type="email"
                            placeholder='example@mail.com'
                            {...register('email', {
                                required: 'Email is required',
                                maxLength: { value: 50, message: 'Max 50 chars' },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid email format'
                                }
                            })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className='field'>
                        <label>Password</label>
                        <input 
                            type="password"
                            placeholder='password'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 4, message: 'Min 4 chars' },
                                maxLength: { value: 200, message: 'Max 200 chars' }
                            })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
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