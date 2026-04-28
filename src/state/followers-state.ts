import {User} from "../models/user.model";
import {jwtDecode} from "jwt-decode";
import {createStore} from "redux";
import {Follower} from "../models/follower.model";
import {VacationDestinationIdModel} from "../models/vacation-destinationId.model";




export class FollowersState {
    currentUserFollowedVacations: Follower[] = [];
    followersCountList: VacationDestinationIdModel[] = [];
}

export enum FollowerActionType {
    GetCurrentUserFollowedVacations = "GetCurrentUserFollowedVacations",
    GetFollowersCountList = "GetFollowersCountList",
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
    newState.currentUserFollowedVacations = [...newState.currentUserFollowedVacations];
    newState.followersCountList = [...newState.followersCountList];

    switch (action.type) {
        case FollowerActionType.GetCurrentUserFollowedVacations:
            newState.currentUserFollowedVacations = action.payload;
            break;
        case FollowerActionType.GetFollowersCountList:
            newState.followersCountList = action.payload;
            break;
        case FollowerActionType.AddFollower:
            newState.currentUserFollowedVacations.push(action.payload);
            break;
        case FollowerActionType.DeleteFollower:
            const indexToDelete: number = newState.currentUserFollowedVacations.findIndex((follower: Follower  ): boolean => follower.id === action.payload);
            newState.currentUserFollowedVacations.splice(indexToDelete, 1);
            break;
    }

    return newState;
}


export const followersStore = createStore(followersReducer);
