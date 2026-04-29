import {User} from "../models/user.model";
import {createStore} from "redux";


export class UserState {
   userList: User[] = [];
}

export enum UserActionType {
    GetUserList = "GetUserList",
    AddUser = "AddUser",
    UpdateUser = "UpdateUser",
    DeleteUser = "DeleteUser",
}

export interface UserAction {
    type: UserActionType,
    payload: any;
}

export function userReducer(userState: UserState = new UserState(), action: UserAction): UserState {

    const newState = {...userState}
    newState.userList = [...newState.userList];

    switch (action.type) {
        case UserActionType.GetUserList:
            newState.userList = action.payload;
            break;
        case UserActionType.AddUser:
            newState.userList.push(action.payload);
            break;
        case UserActionType.UpdateUser:
            const indexToUpdate: number = newState.userList.findIndex((user: User): boolean => user.id === action.payload.id);
            newState.userList[indexToUpdate] = action.payload;
            break;
        case UserActionType.DeleteUser:
            const indexToDelete = newState.userList.findIndex((user: User): boolean => user.id === action.payload);
            newState.userList.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

export const userStore = createStore(userReducer);
