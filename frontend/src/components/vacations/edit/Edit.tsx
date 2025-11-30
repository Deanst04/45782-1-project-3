import { useNavigate, useParams } from 'react-router-dom'
import useService from '../../../hooks/use-service'
import AdminServices from '../../../services/auth-aware/AdminServices'
import './Edit.css'
import type VacationDraft from '../../../models/vacation-draft'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks'
import { editVacation, init } from '../../../redux/vacation-slice'
import Spinner from '../../common/spinner/Spinner'
import VacationServices from '../../../services/auth-aware/VacationServices'
import useScroll from '../../../hooks/use-scroll'

export default function Edit() {

    const { id } = useParams<'id'>()

    const adminServices = useService(AdminServices)
    const vacationServices = useService(VacationServices)
    const foundVacation = useAppSelector(state => state.vacationSlice.vacations.find(v => v.id === id))
    const dispatch = useAppDispatcher()
    const scroll = useScroll()

    const [preview, setPreview] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { register, handleSubmit, reset, formState, watch } = useForm<VacationDraft>()

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {

                if(!id) return undefined

                if(!foundVacation) {
                    const vacationsFromServer = await vacationServices.getVacations()
                    dispatch(init(vacationsFromServer))
                    return
                } else {

                    const { imageName } = foundVacation;

                    setPreview(foundVacation.imageName)

                    if (imageName) {
                        setPreview(`${import.meta.env.VITE_S3_URL}/images.funfly.com/seed/${imageName}`);
                    }

                    reset({
                        destination: foundVacation.destination,
                        description: foundVacation.description,
                        startDate: foundVacation.startDate.split('T')[0],
                        endDate: foundVacation.endDate.split('T')[0],
                        price: foundVacation.price,
                        image: undefined
                    })

                }
            } catch(e) {
                alert(e)
            } finally {
                setIsLoading(false)
            }

        })()
    }, [id, reset, foundVacation, dispatch])

    async function submit(draft: VacationDraft) {
        
        const image = (draft.image as unknown as FileList)[0]
        const payload = {...draft, image}
        console.log(payload)
        
        try {
            const editedVacation = await adminServices.editVacation(id!, payload)
            dispatch(editVacation(editedVacation))
            navigate('/admin')
        } catch(e) {
            alert(e)
        }
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        setPreview(url)
    }


    return (
        <div className='Edit' ref={scroll}>
            
            {isLoading && <Spinner />}

            {!isLoading && foundVacation && (
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
                    required: "Start date is required",
                    validate: value => {
                        if(new Date(value) < new Date('1900-01-01')) return "Date cannot be earlier than 1900"
                        return true
                    }
                })} />
                <div className="formError">{formState.errors.startDate?.message}</div>
                <label>end date</label>
                <input type="date" {...register('endDate', {
                    required: "End date is required",
                    validate: value => {
                        const startDate = new Date(watch('startDate'))
                        const endDate = new Date(value)

                        if(endDate < new Date('1900-01-01')) return "Date cannot be earlier than 1900"
                        if (endDate <= startDate) return "End date must be after start date"
                        return true
                    }
                })} />
                <div className="formError">{formState.errors.endDate?.message}</div>
                <input type="number" placeholder='price' {...register('price', {
                    required: "Price is required",
                    min: { value: 1, message: "Min price: 1" },
                    max: { value: 10000, message: "Max price: 10000" }
                })} />
                <div className="formError">{formState.errors.price?.message}</div>
                <label>cover image</label>
                <div className='image-upload'>
                    {!preview && (
                        <label className='upload-box'>
                            <span>select cover image</span>
                            <input 
                                type='file'
                                accept='image/*'
                                {...register('image')}
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
                                {...register('image')}
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
            )}

        </div>
    )
    
}