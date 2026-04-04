import axios from 'axios';
import {Follower} from '../models/follower.model';
import {User} from "../models/user.model";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {vacationStore} from "../state/vacation-state";
import {UserActionType, userStore} from "../state/user-state";
import {FollowerActionType, followersStore} from "../state/followers-state";

class FollowerService {
    public async getFollowersList(): Promise<Follower[]> {
        const response = await axios.get<Follower[]>(
            appConfig.apiAddress + "api/vacations/followers/", {headers: {Authorization: "Bearer " + authStore.getState().token}});
        followersStore.dispatch({type: FollowerActionType.AddFollower, payload: response.data});
        return followersStore.getState().followersList;
    }

    public async addFollower(follower: Follower): Promise<Follower> {
        console.log(follower);
        try {
            const response = await axios.post<Follower>(appConfig.apiAddress + "vacations/followers", follower, {headers: {Authorization: "Bearer " + authStore.getState().token }});
            followersStore.dispatch({type: FollowerActionType.AddFollower, payload: response.data});
            return response.data;
        } catch (err) {
            console.error("Error from addFollower");
            throw err;
        }
    }

    public async deleteFollower(id: number): Promise<void> {
        try {
            await axios.delete<void>(appConfig.apiAddress + "api/vacations/followers/" + id, {headers: { Authorization: "Bearer " + authStore.getState().token }});
            followersStore.dispatch({type: FollowerActionType.DeleteFollower, payload: id});
        } catch (err) {
            console.error("Error from delete Follower");
            throw err;
        }
    }

}

export const followersService = new FollowerService();