import './New.css'
import { useForm } from 'react-hook-form';
import AdminServices from '../../../services/auth-aware/AdminServices';
import useService from '../../../hooks/use-service';
import type VacationDraft from '../../../models/vacation-draft';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAppDispatcher } from '../../../redux/hooks';
import { addVacation } from '../../../redux/vacation-slice';

export default function New() {

    const { register, handleSubmit, reset, formState } = useForm<VacationDraft>();

    const adminServices = useService(AdminServices)
    const dispatch = useAppDispatcher()

    const navigate = useNavigate()

    const [preview, setPreview] = useState<string>('')

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        setPreview(url)
    }

    async function submit(draft: VacationDraft) {

        draft.image = (draft.image as unknown as FileList)[0]
        console.log(draft)

        try {
            const vacation = await adminServices.createVacation(draft)
            dispatch(addVacation(vacation))
            console.log('submitted')
            reset()
            setPreview('')
            navigate('/admin')
        } catch(e) {
            alert(e)
        }
    }

    return (
        <div className='New'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='add destination' {...register('destination', {
                    required: "Destination is required",
                    minLength: { value: 2, message: "Min 2 chars" },
                    maxLength: { value: 40, message: "Max 40 chars" }
                })} />
                <div className="formError">{formState.errors.destination?.message}</div>
                <textarea placeholder='add description' {...register('description', {
                    required: "Description is required",
                    minLength: { value: 10, message: "Min 10 chars" },
                    maxLength: { value: 300, message: "Max 300 chars" }
                })} ></textarea>
                <div className="formError">{formState.errors.description?.message}</div>
                <label>start date</label>
                <input type="date" {...register('startDate', {
                    required: "Start date is required"
                })} />
                <div className="formError">{formState.errors.startDate?.message}</div>
                <label>end date</label>
                <input type="date" {...register('endDate', {
                    required: "End date is required"
                })} />
                <div className="formError">{formState.errors.endDate?.message}</div>
                <input type="number" placeholder='price' {...register('price', {
                    required: "Price is required",
                    min: { value: 1, message: "Min price: 1" },
                    max: { value: 10000, message: "Max price: 10000" }
                })} />
                <div className="formError">{formState.errors.price?.message}</div>
                <label>cover image</label>
                {/* <input type="file" {...register('imageUrl', {
                    required: "Image is required"
                })} /> */}
                <div className='image-upload'>
                    {!preview && (
                        <label className='upload-box'>
                            <span>select cover image</span>
                            <input 
                                type='file'
                                accept='image/*'
                                {...register('image', {required: "Image is required"})}
                                onChange={handleImageChange}
                                hidden
                            />
                        </label>
                    )}
                    {preview && (
                        <label className='upload-preview'>
                            <img src={preview} alt="preview" />
                            <input 
                                type='file'
                                accept='image/*'
                                {...register('image', {required: "Image is required"})}
                                onChange={handleImageChange}
                                hidden
                            />
                        </label>
                    )}
                </div>
                <div className="formError">{formState.errors.image?.message}</div>
                <button className='add-btn'>add vacation</button>
                <button type='button' className='cancel-btn' onClick={() => navigate('/admin')}>cancel</button>
            </form>
        </div>
    )

}