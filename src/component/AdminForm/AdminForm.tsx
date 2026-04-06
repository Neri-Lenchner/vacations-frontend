import React, {JSX} from 'react';
import './AdminForm.css';
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {User} from "../../models/user.model";
import {Vacation} from "../../models/vacation.model";


function AdminForm(): JSX.Element {

    const {register, watch, formState, handleSubmit, reset, setValue } = useForm<Vacation>();
    return (
        <form>
            <div className="form">
                <h1 className="form-headline">
                    Add Vacation
                </h1>
                <div className="form-input-message">destination</div>
                <input type="text" className="form-destination form-element" {...register("destination",
                    {
                        required: {value: true, message: "Destination is required!"},
                        minLength: {value: 2, message: "Must contain at list 2 letter"}
                    }
                )}/>
                {formState.errors.destination && <p>{formState.errors.description?.message}</p>}
                <div className="form-input-message">last name</div>
                <textarea className="form-description-texterea form-element" {...register("description",
                    {
                        required: {value: true, message: "Description is required!"},
                        minLength: {value: 2, message: "Must contain at list 2 letter"}
                    }
                )}/>
                {formState.errors.description && <p>{formState.errors.description?.message}</p>}
                <div className="form-input-message">email</div>
                <input
                    type="date"
                    className="form-date form-element"
                    {...register("startDate", {
                        required: { value: true, message: "Start date is required!" },
                        // min: { value: 7, message: "Date must be after Jan 1, 2024" }
                    })}
                />
                {formState.errors.startDate && <p>{formState.errors.startDate?.message}</p>}
                <div className="form-input-message">password</div>
                <input
                    type="date"
                    className="form-date form-element"
                    {...register("endDate", {
                        required: { value: true, message: "End date is required!" },
                        // min: { value: 7, message: "Date must be after Jan 1, 2024" }
                    })}
                />
                {formState.errors.endDate && <p>{formState.errors.endDate?.message}</p>}
                <div className="form-input-price">price</div>
                <input
                    type="number"
                    className="form-price form-element"
                    placeholder="$"
                    {...register("endDate", {
                        required: { value: true, message: "End date is required!" },
                        // min: { value: 7, message: "Date must be after Jan 1, 2024" }
                    })}
                />
                <button className="form-button form-element" type="submit">Add Vacation</button>
                <button className="form-button form-element form-delete">Cancel</button>
                {/*<div className="form-input-message form-bottom-message">already a member?</div>*/}
                {/*/!*<NavLink className="form-bottom-message form-link" to="/login-form">login</NavLink>*!/*/}
            </div>
        </form>
    );
}

export default AdminForm;