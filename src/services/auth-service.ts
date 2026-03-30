import axios, {AxiosError} from "axios";
import {appConfig} from "../utils/app-config";
import {User} from "../models/user.model";
import {Credentials} from "../models/credentials.model";
import {AuthActionType, authStore} from "../state/auth-state";
// import {Credentials} from "../models/credentials.model";

class AuthService {

    public async register(user: User): Promise<void> {
        try {
            const response = await axios.post(appConfig.apiAddress + "api/auth/register", user);
            authStore.dispatch({type: AuthActionType.Register, payload: response.data.token});
        } catch (err) {
            const myErr = err as AxiosError;
            throw new Error((myErr.response?.data as any)?.error);
        }
    }

    public async login(credentials: Credentials): Promise<void>  {
        try {
            const response = await axios.post(appConfig.apiAddress + "api/auth/login", credentials);
            authStore.dispatch({type: AuthActionType.Login, payload: response.data.token});
        } catch (err) {
            const myErr = err as AxiosError;
            throw new Error((myErr.response?.data as any)?.error);
        }
    }

    // public async register(user: User): Promise<void> {
    //     try {
    //         await axios.post(appConfig.apiAddress + "api/auth/register", user);
    //     } catch (err) {
    //         const myErr = err as AxiosError;
    //         const data = myErr.response?.data as {error: string};
    //         console.log(myErr);
    //         throw err;
    //     }
    // }

    // public async login(credentials: Credentials): Promise<void>  {
    //     try {
    //         const response = await axios.post(appConfig.apiAddress + "login", credentials);
    //         authStore.dispatch({type: AuthActionType.Login, payload: response.data.token});
    //     } catch (err) {
    //         const myErr = err as AxiosError;
    //         const data = myErr.response?.data as {error: string};
    //         console.log(myErr);
    //         throw err;
    //     }
    // }

}

export const authService = new AuthService();
