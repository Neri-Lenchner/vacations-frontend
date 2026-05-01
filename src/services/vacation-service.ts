import axios from 'axios';
import {Vacation} from "../models/vacation.model";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {VacationActionType, vacationStore} from "../state/vacation-state";

class VacationService {

    async fetchTotal(): Promise<number> {
        const token: string | null = authStore.getState().token;
        try {
            const response = await axios.get<number>(
                `${appConfig.apiAddress}vacations/count/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetTotalVacations, payload: response.data});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllVacations(): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;
        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}vacation-list/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async fetchPage(pageNumber: number, limit = 10): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;
        const offset: number = (pageNumber - 1) * limit;
        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}vacations?limit=${limit}&offset=${offset}`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getUsersFollowedVacations(id: number): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;

        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}vacations/user/${id}/followers/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            vacationStore.dispatch({type: VacationActionType.GetTotalVacations, payload: response.data.length});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getUpcomingVacations(): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;

        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}vacations/upcoming/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            vacationStore.dispatch({type: VacationActionType.GetTotalVacations, payload: response.data.length});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getActiveVacations(): Promise<Vacation[]> {
        const token: string | null = authStore.getState().token;

        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}vacations/active/`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            vacationStore.dispatch({type: VacationActionType.GetTotalVacations, payload: response.data.length});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async fetchData(pageNumber: number, limit = 10): Promise<void> {
        await this.fetchTotal();
        const data: Vacation[] = await this.fetchPage(pageNumber, limit);
        vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: data});
    }

    async getVacationById(id: number): Promise<Vacation> {
        const token: string | null = authStore.getState().token;
        try {
            const response = await axios.get<Vacation>(
                `${appConfig.apiAddress}vacation/${id}`,
                {headers: { Authorization: "Bearer " + token }}
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async addVacation(vacation: Vacation, imageFile?: File): Promise<Vacation> {
        const token: string | null = authStore.getState().token;
        const formData = new FormData();
        formData.append("vacation", JSON.stringify(vacation));
        console.log(vacation);
        if (imageFile) {
            formData.append("image", imageFile);
        }
        try {
            const response = await axios.post<Vacation>(
                `${appConfig.apiAddress}vacation`, formData, {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.AddVacation, payload: response.data});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateVacation(id: number, vacation: Vacation, imageFile?: File): Promise<Vacation> {
        const token: string | null = authStore.getState().token;
        const formData = new FormData();
        formData.append("vacation", JSON.stringify(vacation));
        if (imageFile) {
            formData.append("image", imageFile);
        }
        try {
            const response = await axios.put<Vacation>(
                `${appConfig.apiAddress}vacation/${id}`, formData, {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.UpdateVacation, payload: response.data});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async deleteVacation(id: number): Promise<void> {
        const token: string | null = authStore.getState().token;
        try {
            await axios.delete<void>(`${appConfig.apiAddress}vacation/${id}`,{headers: { Authorization: "Bearer " + token }})
            vacationStore.dispatch({type: VacationActionType.DeleteVacation, payload: id});
        } catch (error) {
            throw error;
        }
    }

}

export const vacationService = new VacationService();