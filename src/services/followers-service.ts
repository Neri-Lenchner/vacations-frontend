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
            appConfig.apiAddress + "vacations/followers/", {headers: {Authorization: "Bearer " + authStore.getState().token}});
        followersStore.dispatch({type: FollowerActionType.GetFollowersList, payload: response.data});
        return followersStore.getState().followersList;
    }
}

export const followerService = new FollowerService();