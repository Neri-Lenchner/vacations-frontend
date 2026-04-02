import {Vacation} from "../models/vacation.model";
import {jwtDecode} from "jwt-decode";
import {createStore} from "redux";


export class VacationState {
    vacationList: Vacation[] = [];
}

export enum VacationActionType {
    GetVacationList = "GetVacationList",
    // AddUser = "AddUser",
    // UpdateUser = "UpdateUser",
    // DeleteUser = "DeleteUser",
}

export interface VacationAction {
    type: VacationActionType,
    payload: any;
}

export function vacationReducer(vacationState: VacationState = new VacationState(), action: VacationAction): VacationState {

    const newState = {...vacationState}
    newState.vacationList = [...newState.vacationList];

    switch (action.type) {
        case VacationActionType.GetVacationList:
            newState.vacationList = action.payload;
            break;
        // case VacationActionType.AddUser:
        //     newState.userList.push(action.payload);
        //     break;
        // case VacationActionType.UpdateUser:
        //     const indexToUpdate: number = newState.userList.findIndex((user: User): boolean => user.id === action.payload.id);
        //     newState.userList[indexToUpdate] = action.payload;
        //     break;
        // case VacationActionType.DeleteUser:
        //     const indexToDelete = newState.userList.findIndex((user: User): boolean => user.id === action.payload);
        //     newState.userList.splice(indexToDelete, 1);
        //     break;
    }

    return newState;
}

export const vacationStore = createStore(vacationReducer);
