import React, {JSX, useEffect, useState} from 'react';
import './AdminForm.css';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Vacation} from "../../models/vacation.model";
import {vacationStore} from "../../state/vacation-state";
import {vacationService} from "../../services/vacation-service";
import {appConfig} from "../../utils/app-config";

function AdminForm(): JSX.Element {
    const {register, formState, handleSubmit, reset} = useForm<Vacation>();
    const navigate = useNavigate();
    const params = useParams();
    let [vacationToUpdate, setVacationToUpdate] = useState<Vacation | undefined>(undefined);

    useEffect(() => {

        function getSingleVacation(id: number): void {
             vacationToUpdate = vacationStore.getState().vacationList.find((vacation: Vacation): boolean => vacation.id === id);
            if (vacationToUpdate) {
                const {startDate, endDate} = vacationToUpdate;
                vacationToUpdate.startDate = startDate.split('T')[0];
                vacationToUpdate.endDate = endDate.split('T')[0];
                setVacationToUpdate(vacationToUpdate);
                reset(vacationToUpdate);
            }
        }

        if (params.id) {
            getSingleVacation(+params.id);
        }

    }, [params.id, reset]);

    async function addVacation(vacation: Vacation): Promise<void>{
        //     event.preventDefault();
        console.log("Form data:", vacation);
        try {
            await vacationService.addVacation(vacation);
            navigate("/vacations");
        }
        catch (error) {
            alert(error);
            console.error(error);
        }
    }

    async function updateVacation(id: number, vacation: Vacation): Promise<void>{
        //     event.preventDefault();
        console.log("Updating vacation with ID:", id, "Data:", vacation);
        try {
            await vacationService.updateVacation(id, vacation);
            navigate("/vacations");
        }
        catch (error) {
            alert(error);
            console.error(error);
        }
    }


    return (
        <form onSubmit={params.id ? handleSubmit(vacation => updateVacation(+params.id!, vacation)) : handleSubmit(addVacation)}>
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
                        <div className="form-input-message">description</div>
                        <textarea className="form-description-texterea form-element" {...register("description",
                            {
                                required: {value: true, message: "Description is required!"},
                                minLength: {value: 2, message: "Must contain at list 2 letter"}
                            }
                        )}/>
                        {formState.errors.description && <p>{formState.errors.description?.message}</p>}
                        <div className="form-split-buttons">
                            <button
                                className="form-button form-element"
                                type="submit"
                                // onClick={}
                                >
                                {params.id ? "Update Vacation" : "Add Vacation"}
                            </button>
                        </div>
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
                            })}
                        />
                        {formState.errors.endDate && <p>{formState.errors.endDate?.message}</p>}
                        <div className="form-input-message">Upload Image</div>
                        <input
                            type="file"
                            className="form-file form-element"
                            placeholder="Upload Image"
                            {...register("imageName", {
                                required: false
                            })}
                        />
                        <div className="admin-form-image-container">
                            <img className="admin-form-img" src={ vacationToUpdate?.imageName ? appConfig.uploadsAddress + vacationToUpdate.imageName :  "https://www.shutterstock.com/image-photo/sun-sets-behind-mountain-ranges-600nw-2479236003.jpg"}/>
                        </div>
                        <div className="form-split-buttons">
                            <NavLink className="form-cancel-button" to={"/vacations"}>Cancel</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AdminForm;