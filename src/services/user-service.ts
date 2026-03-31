import axios from "axios";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {User} from "../models/user.model";
import {UserActionType, userStore} from "../state/user-state";

class UserService {

    isFetched: boolean = false;

    public async getUserList(forceFetch: boolean = false): Promise<User[]> {
        if (!this.isFetched || forceFetch) {
            try {
                const response = await axios.get<User[]>(appConfig.apiAddress + "user/", {headers: {Authorization: "Bearer " + authStore.getState().token}});
                userStore.dispatch({type: UserActionType.GetUserList, payload: response.data});
            } catch (err) {
                console.error("Error from getUserList");
                throw err;
            }
        }
        return userStore.getState().userList;
    }

}

export const userService = new UserService();
