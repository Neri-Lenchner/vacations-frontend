import React, {JSX} from 'react';
import {AxiosError} from 'axios';
import {ErrorModel} from "../../models/error.model";
import {useForm} from "react-hook-form";
import {Credentials} from "../../models/credentials.model";
import {NavLink, useNavigate} from "react-router-dom";
import {authService} from "../../services/auth-service";
import './LoginForm.css';

function LoginForm(): JSX.Element {
    const {register, formState, handleSubmit, reset} = useForm<Credentials>();
    const navigate = useNavigate();

    async function login(credentials: Credentials): Promise<void> {
        try {
            await authService.login(credentials);
            reset();
            navigate("/vacations");
        }
        catch (error) {
            const myErr = error as AxiosError;
            const message = (myErr.response?.data as ErrorModel)?.error;
            alert(message || "Something went wrong");
        }
    }

    return (
        <form onSubmit={handleSubmit(login)}>
            <div className="form">
                <h1 className="form-headline">
                    Login
                </h1>
                <div className="form-input-message">email</div>
                <input type="email" className="form-email form-element" {...register("email",
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
                <button className="form-button form-element" type="submit">Login</button>
                <div className="form-input-message form-bottom-message">don't have an account?</div>
                <NavLink className="form-bottom-message form-link" to="/registration-form">register now</NavLink>
            </div>
        </form>
    );
}

export default LoginForm;