import axios from "axios";
import {appConfig} from "../utils/app-config";
import {User} from "../models/user.model";
import {Credentials} from "../models/credentials.model";
import {AuthActionType, authStore} from "../state/auth-state";

class AuthService {

    public async register(user: User): Promise<void> {
        try {
            const response = await axios.post(appConfig.apiAddress + "auth/register", user);
            authStore.dispatch({type: AuthActionType.Register, payload: response.data.token});
        } catch (err) {
            throw err;
        }
    }

    public async login(credentials: Credentials): Promise<void>  {
        try {
            const response = await axios.post(appConfig.apiAddress + "auth/login", credentials);
            authStore.dispatch({type: AuthActionType.Login, payload: response.data.token});
        } catch (err) {
            throw err;
        }
    }

}

export const authService = new AuthService();
