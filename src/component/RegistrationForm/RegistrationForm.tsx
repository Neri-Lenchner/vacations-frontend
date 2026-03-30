import React, {JSX} from 'react';
import {useForm} from "react-hook-form";
import {User} from "../../models/user.model";
import './RegistrationForm.css';
import {NavLink} from "react-router-dom";
import {authService} from "../../services/auth-service";


function RegistrationForm(): JSX.Element {
    const {register, watch, formState, handleSubmit, reset, setValue } = useForm<User>();

    async function registerUser(user: User) {

        try {
                user.isAdmin = false;
                await authService.register(user);

            reset();
            // navigate("/courses-list");
        }
        catch (error) {
            alert(error);
        }
    }


    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <div className="form">
                <h1 className="form-headline">
                    Register
                </h1>
                <div className="form-input-message">first name</div>
                <input type="text" className="form-first-name form-element" {...register("firstName",
                    {
                        required: {value: true, message: "First name is required!"},
                        minLength: {value: 2, message: "Must contain at list 2 letter"}
                    }
                )}/>
                {formState.errors.firstName && <p>{formState.errors.firstName?.message}</p>}
                <div className="form-input-message">last name</div>
                <input type="text" className="form-last-name form-element" {...register("lastName",
                    {
                        required: {value: true, message: "Last name is required!"},
                        minLength: {value: 2, message: "Must contain at list 2 letter"}
                    }
                )}/>
                {formState.errors.lastName && <p>{formState.errors.lastName?.message}</p>}
                <div className="form-input-message">email</div>
                <input type="text" className="form-email form-element" {...register("email",
                    {
                        required: {value: true, message: "Email is required!"},
                        minLength: {value: 7, message: "Email must be valid"}
                    }
                )}/>
                {formState.errors.email && <p>{formState.errors.email?.message}</p>}
                <div className="form-input-message">password</div>
                <input type="password" className="form-password form-element" {...register("password",
                    {
                        required: {value: true, message: "Password is required!"},
                        minLength: {value: 2, message: "Password must contain at list 4 characters"}
                    }
                )}/>
                {formState.errors.password && <p>{formState.errors.password?.message}</p>}
                <button className="form-button form-element" type="submit">Add Post</button>
                <div className="form-input-message form-bottom-message">already a member?</div>
                <NavLink className="form-bottom-message form-link" to="/">login</NavLink>
            </div>

            <div className="form">
                <h1 className="form-headline">
                    Register
                </h1>
                <div className="form-input-message">first name</div>
                <input type="text" className="form-first-name form-element" {...register("firstName",
                    {
                        required: {value: true, message: "First name is required!"},
                        minLength: {value: 2, message: "Must contain at list 2 letter"}
                    }
                )}/>
                {formState.errors.firstName && <p>{formState.errors.firstName?.message}</p>}
                <div className="form-input-message">last name</div>
                <input type="text" className="form-last-name form-element" {...register("lastName",
                    {
                        required: {value: true, message: "Last name is required!"},
                        minLength: {value: 2, message: "Must contain at list 2 letter"}
                    }
                )}/>
                {formState.errors.lastName && <p>{formState.errors.lastName?.message}</p>}
                <div className="form-input-message">email</div>
                <input type="text" className="form-email form-element" {...register("email",
                    {
                        required: {value: true, message: "Email is required!"},
                        minLength: {value: 7, message: "Email must be valid"}
                    }
                )}/>
                {formState.errors.email && <p>{formState.errors.email?.message}</p>}
                <div className="form-input-message">password</div>
                <input type="password" className="form-password form-element" {...register("password",
                    {
                        required: {value: true, message: "Password is required!"},
                        minLength: {value: 2, message: "Password must contain at list 4 characters"}
                    }
                )}/>
                {formState.errors.password && <p>{formState.errors.password?.message}</p>}
                <button className="form-button form-element" type="submit">Add Post</button>
                <div className="form-input-message form-bottom-message">already a member?</div>
                <NavLink className="form-bottom-message form-link" to="/">login</NavLink>
            </div>
        </form>

    );
}

export default RegistrationForm;