import axios, {AxiosError} from "axios";
import {ErrorModel} from "../models/error.model";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {User} from "../models/user.model";
import {UserActionType, userStore} from "../state/user-state";

class UserService {

    isFetched: boolean = false;

    public async getUserList(forceFetch: boolean = false): Promise<User[]> {
        if (!this.isFetched || forceFetch) {
            try {
                const response = await axios.get<User[]>(appConfig.apiAddress + "users/", {headers: {Authorization: "Bearer " + authStore.getState().token}});
                userStore.dispatch({type: UserActionType.GetUserList, payload: response.data});
            } catch (error) {
                const myErr = error as AxiosError;
                const data = myErr.response?.data as ErrorModel;
                throw error;
            }
        }
        return userStore.getState().userList;
    }

}

export const userService = new UserService();
