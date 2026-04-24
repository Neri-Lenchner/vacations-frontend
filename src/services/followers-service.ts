import axios from 'axios';
import {Follower} from '../models/follower.model';
import {User} from "../models/user.model";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {UserActionType, userStore} from "../state/user-state";
import {FollowerActionType, followersStore} from "../state/followers-state";
import {VacationDestinationIdModel} from "../models/vacation-destinationId.model";

class FollowerService {
    public async getFollowersList(): Promise<Follower[]> {
        const response = await axios.get<Follower[]>(
            appConfig.apiAddress + "vacations/followers/", {headers: {Authorization: "Bearer " + authStore.getState().token}});
        followersStore.dispatch({type: FollowerActionType.GetFollowersList, payload: response.data});
        return followersStore.getState().followersList;
    }

    public async getFollowersListById(id: number): Promise<Follower[]> {
        const response = await axios.get<Follower[]>(
            appConfig.apiAddress + "vacations/followers/" + id, {headers: {Authorization: "Bearer " + authStore.getState().token}});
        followersStore.dispatch({type: FollowerActionType.GetFollowersList, payload: response.data});
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
            await axios.delete<void>(appConfig.apiAddress + "vacations/followers/" + id, {headers: { Authorization: "Bearer " + authStore.getState().token }});
            followersStore.dispatch({type: FollowerActionType.DeleteFollower, payload: id});
        } catch (err) {
            console.error("Error from delete Follower");
            throw err;
        }
    }

    public async getVacationDestinationWithFollowerCount(): Promise<VacationDestinationIdModel[]> {
        const response = await axios.get<VacationDestinationIdModel[]>(
            appConfig.apiAddress + "vacations/destination-followers", {headers: {Authorization: "Bearer " + authStore.getState().token}});
        return response.data;
    }

    public async downloadFollowersCSV(followers: Follower[]): Promise<void> {
        try {
            const response = await axios.post<string>(
                appConfig.apiAddress + "vacations/followers/csv",
                followers,
                {
                    headers: { Authorization: "Bearer " + authStore.getState().token },
                    responseType: 'blob'
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'followers.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error downloading followers CSV");
            throw err;
        }
    }

}

export const followersService = new FollowerService();