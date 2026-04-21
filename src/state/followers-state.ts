import {User} from "../models/user.model";
import {jwtDecode} from "jwt-decode";
import {createStore} from "redux";
import {Follower} from "../models/follower.model";
import {VacationDestinationIdModel} from "../models/vacation-destinationId.model";



export class FollowersState {
    followersList: Follower[] = [];
    followersVacationIdList: VacationDestinationIdModel[] = [];
}

export enum FollowerActionType {
    GetFollowersList = "GetFollowersList",
    GetFollowersIdList = "GetFollowersIdList",
    AddFollower = "AddFollower",
    // UpdateUser = "UpdateUser",
    DeleteFollower = "DeleteFollower",
}

export interface FollowerAction {
    type: FollowerActionType,
    payload: any;
}

export function followersReducer(followersState: FollowersState = new FollowersState(), action: FollowerAction): FollowersState {

    const newState = {...followersState}
    newState.followersList = [...newState.followersList];

    switch (action.type) {
        case FollowerActionType.GetFollowersList:
            newState.followersList = action.payload;
            break;
        case FollowerActionType.GetFollowersIdList:
            newState.followersVacationIdList = action.payload;
            break;
        case FollowerActionType.AddFollower:
            newState.followersList.push(action.payload);
            break;
        case FollowerActionType.DeleteFollower:
            const indexToDelete: number = newState.followersList.findIndex((follower: Follower  ): boolean => follower.id === action.payload);
            newState.followersList.splice(indexToDelete, 1);
            break;
    }

    return newState;
}


export const followersStore = createStore(followersReducer);
