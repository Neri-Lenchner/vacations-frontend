import {User} from "../models/user.model";
import {jwtDecode} from "jwt-decode";
import {createStore} from "redux";
import {Follower} from "../models/follower.model";



export class FollowersState {
    followersList: Follower[] = [];
}

export enum FollowerActionType {
    GetFollowersList = "GetFollowersList",
    // AddUser = "AddUser",
    // UpdateUser = "UpdateUser",
    // DeleteUser = "DeleteUser",
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
        // case UserActionType.AddUser:
        //     newState.userList.push(action.payload);
        //     break;
        // case UserActionType.UpdateUser:
        //     const indexToUpdate: number = newState.userList.findIndex((user: User): boolean => user.id === action.payload.id);
        //     newState.userList[indexToUpdate] = action.payload;
        //     break;
        // case UserActionType.DeleteUser:
        //     const indexToDelete = newState.userList.findIndex((user: User): boolean => user.id === action.payload);
        //     newState.userList.splice(indexToDelete, 1);
        //     break;
    }

    return newState;
}


export const followersStore = createStore(followersReducer);
