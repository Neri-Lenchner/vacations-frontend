import {Vacation} from "../models/vacation.model";
import {jwtDecode} from "jwt-decode";
import {createStore} from "redux";


export class VacationState {
    vacationList: Vacation[] = [];
    selectedVacation: Vacation | null = null;
    totalVacations: number = 0;
}

export enum VacationActionType {
    GetVacationList = "GetVacationList",
    GetTotalVacations = "GetTotalVacations",
    GetSelectedVacation = "GetSelectedVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
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
        case VacationActionType.GetTotalVacations:
            newState.totalVacations = action.payload;
            break;
        case VacationActionType.GetSelectedVacation:
            newState.selectedVacation = action.payload;
            break;
        case VacationActionType.AddVacation:
            newState.vacationList.push(action.payload);
            break;
        case VacationActionType.UpdateVacation:
            const indexToUpdate: number = newState.vacationList.findIndex((vacation: Vacation): boolean => vacation.id === action.payload.id);
            newState.vacationList[indexToUpdate] = action.payload;
            break;
        case VacationActionType.DeleteVacation:
            const indexToDelete: number = newState.vacationList.findIndex((vacation: Vacation): boolean => vacation.id === action.payload);
            newState.vacationList.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

export const vacationStore = createStore(vacationReducer);
