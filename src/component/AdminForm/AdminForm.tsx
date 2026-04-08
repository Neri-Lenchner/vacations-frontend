import React, {JSX, useEffect, useRef} from 'react';
import './AdminForm.css';
import {NavLink, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {User} from "../../models/user.model";
import {Vacation} from "../../models/vacation.model";
import {vacationStore} from "../../state/vacation-state";
import {vacationService} from "../../services/vacation-service";

function AdminForm(): JSX.Element {
    const {register, formState, handleSubmit, reset} = useForm<Vacation>();

    const params = useParams();
    let vacationToUpdate = useRef<Vacation | undefined>(undefined);

    useEffect(() => {

        function getSingleVacation(id: number) {
            vacationToUpdate.current = vacationStore.getState().vacationList.find((vacation) => vacation.id === id);
            if (vacationToUpdate.current) {
                const {startDate, endDate} = vacationToUpdate.current;
                vacationToUpdate.current.startDate = startDate.split('T')[0];
                vacationToUpdate.current.endDate = endDate.split('T')[0];
                reset(vacationToUpdate.current);
            }
        }

        if (params.id) {
            getSingleVacation(+params.id);
        }


        // async function getSingleCourse() {
        //     try {
        //         setLoading(true);
        //         courseToUpdate.current = await courseService.getSingleCourse(+params.id!);
        //         setValue("name", courseToUpdate.current.name);
        //         setValue("duration", courseToUpdate.current.duration);
        //         setValue("difficulty", courseToUpdate.current.difficulty);
        //         setValue("numOfStudents", courseToUpdate.current.numOfStudents);
        //         setValue("lecturerId", courseToUpdate.current.lecturerId);
        //         setLoading(false);
        //     }
        //     catch (err) {
        //         alert(err)
        //     }
        // }

    }, [params.id, reset]);

    // async function addVacation(event: React.FormEvent<HTMLFormElement>): Promise<void>{
    //     event.preventDefault();
    //     const vacation = watch();
    //     console.log("Form data:", vacation);
    //     try {
    //         await vacationService.addVacation(vacation);
    //
    //         // reset();
    //         // navigate("/vacations");
    //     }
    //     catch (error) {
    //         alert(error);
    //         console.error(error);
    //     }
    // }

    async function addVacation(vacation: Vacation): Promise<void>{
        console.log("Form data:", vacation);
        try {
            await vacationService.addVacation(vacation);
        }
        catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(addVacation)}>
            <div className="form">
                <h1 className="form-headline">
                    {params.id ? "Update Vacation" : "Add Vacation"}
                </h1>
                <div className="form-split">
                    <div className="form-split-1">
                        <div className="form-input-message">destination</div>
                        <input type="text" className="form-destination form-element" {...register("destination",
                            {
                                required: {value: true, message: "Destination is required!"},
                                minLength: {value: 2, message: "Must contain at list 2 letter"}
                            }
                        )}/>
                        {formState.errors.destination && <p>{formState.errors.destination?.message}</p>}
                        <input
                            type="file"
                            className="form-file form-element"
                            {...register("image", {
                                required: { value: true, message: "!" },
                                min: { value: 1, message: "Image is optional" }
                            })}
                        />
                        <div className="form-input-message">description</div>
                        <textarea className="form-description-texterea form-element" {...register("description",
                            {
                                required: {value: true, message: "Description is required!"},
                                minLength: {value: 2, message: "Must contain at list 2 letter"}
                            }
                        )}/>
                        {formState.errors.description && <p>{formState.errors.description?.message}</p>}
                    </div>
                    <div className="form-split-2">
                        <div className="form-input-message">start date</div>
                        <input
                            type="date"
                            className="form-date form-element"
                            {...register("startDate", {
                                required: { value: true, message: "Start date is required!" },
                                // min: { value: 7, message: "Date must be after Jan 1, 2024" }
                            })}
                        />
                        {formState.errors.startDate && <p>{formState.errors.startDate?.message}</p>}
                        <div className="form-input-message">end date</div>
                        <input
                            type="date"
                            className="form-date form-element"
                            {...register("endDate", {
                                required: { value: true, message: "End date is required!" },
                                // min: { value: 7, message: "Date must be after Jan 1, 2024" }
                            })}
                        />
                        {formState.errors.endDate && <p>{formState.errors.endDate?.message}</p>}
                        <div className="form-input-message">price</div>
                        <input
                            type="number"
                            className="form-price form-element"
                            placeholder="$"
                            {...register("cost", {
                                valueAsNumber: true,
                                required: { value: true, message: "Cost date is required!" },
                                min: { value: 1, message: "Price can not be negative" },
                                max: { value: 10000, message: "Price can not be more than 10,000$" }
                            })}
                        />
                        {formState.errors.cost && <p>{formState.errors.cost?.message}</p>}
                        <div className="form-split-buttons">
                            <button className="form-button form-element" type="submit">
                                {params.id ? "Update Vacation" : "Add Vacation"}
                            </button>
                            <button className="form-button form-element form-delete">Cancel</button>
                        </div>

                        {/*<div className="form-input-message form-bottom-message">already a member?</div>*/}
                        {/*/!*<NavLink className="form-bottom-message form-link" to="/login-form">login</NavLink>*!/*/}
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AdminForm;