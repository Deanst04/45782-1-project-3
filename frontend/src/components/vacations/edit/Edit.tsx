import { useNavigate, useParams } from 'react-router-dom';
import useService from '../../../hooks/use-service';
import AdminServices from '../../../services/auth-aware/AdminServices';
import './Edit.css';
import type VacationDraft from '../../../models/vacation-draft';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks';
import { editVacation, init } from '../../../redux/vacation-slice';
import Spinner from '../../common/spinner/Spinner';
import VacationServices from '../../../services/auth-aware/VacationServices';
import useScroll from '../../../hooks/use-scroll';
import getImageUrl from '../../../utils/s3';

export default function Edit() {

    const { id } = useParams<'id'>();
    const adminServices = useService(AdminServices);
    const vacationServices = useService(VacationServices);

    const foundVacation = useAppSelector(state =>
        state.vacationSlice.vacations.find(v => v.id === id)
    );

    const dispatch = useAppDispatcher();
    const scroll = useScroll();
    const navigate = useNavigate();

    const [preview, setPreview] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { register, handleSubmit, reset, setValue, formState } =
        useForm<VacationDraft>();


    // INIT
    useEffect(() => {
        (async () => {
            try {
                if (!id) return;

                // First step → if Redux is empty, fetch vacations ONCE
                if (!foundVacation) {
                    const vacations = await vacationServices.getVacations();
                    dispatch(init(vacations));
                    return; // wait for rerender with the real vacation
                }

                // Now Redux has the vacation → populate form
                setPreview(
                    foundVacation.imageName
                        ? getImageUrl(foundVacation.imageName)
                        : ''
                );

                reset({
                    destination: foundVacation.destination,
                    description: foundVacation.description,
                    startDate: foundVacation.startDate.split('T')[0],
                    endDate: foundVacation.endDate.split('T')[0],
                    price: foundVacation.price,
                    image: undefined
                });

                setValue("image", undefined);

                setIsLoading(false);

            } catch (e) {
                alert(e);
                setIsLoading(false);
            }
        })();
    }, [id, foundVacation, dispatch]);


    // IMAGE CHANGE
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowed.includes(file.type)) {
            alert("Invalid file type. Allowed: jpeg, jpg, png, webp");
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            alert("Image too large. Max size: 3MB");
            return;
        }

        const dt = new DataTransfer();
        dt.items.add(file);
        setValue("image", dt.files, { shouldValidate: true, shouldDirty: true });

        setPreview(URL.createObjectURL(file));
    }


    // BUILD FINAL DRAFT
    function buildFinalDraft(draft: VacationDraft): VacationDraft {
        return {
            destination: draft.destination || foundVacation!.destination,
            description: draft.description || foundVacation!.description,
            startDate: draft.startDate || foundVacation!.startDate.split("T")[0],
            endDate: draft.endDate || foundVacation!.endDate.split("T")[0],
            price: draft.price || foundVacation!.price,
            image: draft.image && draft.image.length > 0 ? draft.image : undefined
        };
    }


    // SUBMIT
    async function submit(draft: VacationDraft) {
        try {
            const finalDraft = buildFinalDraft(draft);

            const updated = await adminServices.editVacation(id!, finalDraft);

            dispatch(editVacation(updated));
            navigate('/admin');

        } catch (e) {
            alert(e);
        }
    }


    // RENDER
    if (isLoading) return <Spinner />;

    if (!foundVacation) return <div>Loading vacation...</div>;

    return (
        <div className='Edit' ref={scroll}>
            <form onSubmit={handleSubmit(submit)}>

                <input
                    placeholder='add destination'
                    {...register('destination')}
                />
                <div className="formError">{formState.errors.destination?.message}</div>

                <textarea
                    placeholder='add description'
                    {...register('description')}
                />
                <div className="formError">{formState.errors.description?.message}</div>

                <label>start date</label>
                <input
                    type="date"
                    {...register("startDate", {
                        validate: (value) => {
                            if (!value) return true;
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            const selected = new Date(value);
                            return selected >= tomorrow || "Start date must be at least tomorrow";
                        }
                    })}
                />
                <div className="formError">{formState.errors.startDate?.message}</div>

                <label>end date</label>
                <input
                    type="date"
                    {...register("endDate", {
                        validate: (value) => {
                            if (!value) return true;

                            const startInput = document.querySelector("input[name='startDate']") as HTMLInputElement;
                            const startVal = startInput?.value;
                            if (!startVal) return true;

                            const start = new Date(startVal);
                            if (String(start) === "Invalid Date") return true;

                            const minEnd = new Date(start);
                            minEnd.setDate(minEnd.getDate() + 1);

                            const end = new Date(value);
                            return end >= minEnd || "End date must be at least 1 day after start date";
                        }
                    })}
                />
                <div className="formError">{formState.errors.endDate?.message}</div>

                <input
                    type="number"
                    placeholder='price'
                    {...register('price')}
                />
                <div className="formError">{formState.errors.price?.message}</div>

                <label>cover image</label>

                <div className='image-upload'>
                    {!preview && (
                        <label className='upload-box'>
                            <span>select cover image</span>
                            <input
                                type='file'
                                accept='image/*'
                                {...register("image")}
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
                                {...register("image")}
                                onChange={handleImageChange}
                                hidden
                            />
                        </label>
                    )}
                </div>

                <button className='add-btn'>save changes</button>
                <button
                    type='button'
                    className='cancel-btn'
                    onClick={() => navigate('/admin')}
                >
                    cancel
                </button>

            </form>
        </div>
    );
}