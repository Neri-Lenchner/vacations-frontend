import axios from 'axios';
import {User} from "../models/user.model";
import {Vacation} from "../models/vacation.model";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {UserActionType, userStore} from "../state/user-state";
import {VacationActionType, vacationStore} from "../state/vacation-state";

class VacationService {

    constructor() {}

    // total number of vacations
    async fetchTotal(): Promise<number> {
        const token: string | null = authStore.getState().token;
        try {
            const response = await axios.get<number>(
                `${appConfig.apiAddress}api/vacations/count/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetTotalVacations, payload: response.data});

            // Axios auto-parses JSON, so total.data is already the number
            return response.data;

        } catch (err) {
            console.error("Failed to fetch total count", err);
            throw new Error("Failed to fetch total count");
        }
    }

    // paginated list of vacations
    async fetchPage(page: number, limit = 10): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;
        const offset: number = (page - 1) * limit;

        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}api/vacations?limit=${limit}&offset=${offset}`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            return response.data;
        } catch (err) {
            console.error("Failed to fetch paginated data", err);
            throw new Error("Failed to fetch paginated data");
        }
    }

    public async getUsersFollowedVacations(id: number): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;

        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}api/vacations/user/${id}/followers/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            vacationStore.dispatch({type: VacationActionType.GetTotalVacations, payload: response.data.length});
            return response.data;
        } catch (err) {
            console.error("Failed to fetch data", err);
            throw new Error("Failed to fetch data");
        }
    }

    public async getUpcomingVacations(): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;

        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}api/vacations/upcoming/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            vacationStore.dispatch({type: VacationActionType.GetTotalVacations, payload: response.data.length});
            return response.data;
        } catch (err) {
            console.error("Failed to fetch data", err);
            throw new Error("Failed to fetch data");
        }
    }

    public async getActiveVacations(): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;

        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}api/vacations/active/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            vacationStore.dispatch({type: VacationActionType.GetTotalVacations, payload: response.data.length});
            return response.data;
        } catch (err) {
            console.error("Failed to fetch data", err);
            throw new Error("Failed to fetch data");
        }
    }

    // api/vacations/followers/

    // fetch total + page
    async fetchData(page: number, limit = 10): Promise<void> {

        try {
            await this.fetchTotal();
            const data: Vacation[] = await this.fetchPage(page, limit);
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: data});
        } catch (err) {
            console.error("Failed to fetch data", err);
        }
    }

    async addVacation(vacation: Vacation): Promise<Vacation> {
        const token: string | null = authStore.getState().token;

        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("cost", vacation.cost.toString());
        formData.append("image", vacation.image![0]);

        try {

            const response = await axios.post<Vacation>(
                `${appConfig.apiAddress}api/vacation`, formData, {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.AddVacation, payload: response.data});
            return response.data;
        } catch (error) {
           throw new Error("Failed to add Vacation");
        }

    }
}

export const vacationService = new VacationService();