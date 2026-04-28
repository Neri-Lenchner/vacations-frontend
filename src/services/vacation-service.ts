import axios, {AxiosError} from 'axios';
import {Vacation} from "../models/vacation.model";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {VacationActionType, vacationStore} from "../state/vacation-state";
import {VacationDestinationIdModel} from "../models/vacation-destinationId.model";

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
        } catch (err) {
            console.error("Failed to fetch total count", err);
            throw new Error("Failed to fetch total count");
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
        } catch (err) {
            console.error("Failed to fetch all vacations", err);
            throw new Error("Failed to fetch all vacations");
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
        } catch (err) {
            console.error("Failed to fetch paginated data", err);
            throw new Error("Failed to fetch paginated data");
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
        } catch (err) {
            console.error("Failed to fetch data", err);
            throw new Error("Failed to fetch data");
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
        } catch (err) {
            console.error("Failed to fetch data", err);
            throw new Error("Failed to fetch data");
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
        } catch (err) {
            console.error("Failed to fetch data", err);
            throw new Error("Failed to fetch data");
        }
    }

    async fetchData(pageNumber: number, limit = 10): Promise<void> {
        try {
            await this.fetchTotal();
            const data: Vacation[] = await this.fetchPage(pageNumber, limit);
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: data});
        } catch (err) {
            console.error("Failed to fetch data", err);
        }
    }

    async getVacationById(id: number): Promise<Vacation> {
        const token: string | null = authStore.getState().token;
        try {
            const response = await axios.get<Vacation>(
                `${appConfig.apiAddress}vacation/${id}`,
                {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.GetSelectedVacation, payload: response.data});
            return response.data;
        } catch (err) {
            console.error("Failed to fetch data", err);
            throw new Error("Failed to fetch data");
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
            const myErr = error as AxiosError;
            const data = myErr.response?.data as {error: string};
            console.error(data);
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
            const myErr = error as AxiosError;
            const data = myErr.response?.data as {error: string};
            console.error(data);
            throw error;
        }
    }

    public async deleteVacation(id: number): Promise<void> {
        const token: string | null = authStore.getState().token;
        try {
            await axios.delete<void>(`${appConfig.apiAddress}vacation/${id}`,{headers: { Authorization: "Bearer " + token }})
            vacationStore.dispatch({type: VacationActionType.DeleteVacation, payload: id});
        } catch (err) {
            console.error("Error from delete Course");
            throw err;
        }
    }

    public async getVacationDestinationAndIdList(): Promise<VacationDestinationIdModel[]> {
        const response = await axios.get<VacationDestinationIdModel[]>(
            appConfig.apiAddress + "vacations/destination-and-id-list", {headers: {Authorization: "Bearer " + authStore.getState().token}});
        vacationStore.dispatch({type: VacationActionType.GetVacationDestinationIdList, payload: response.data});
        return vacationStore.getState().vacationDestinationAndIdList;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async addVacation1(vacation: Vacation): Promise<Vacation> {
        const token: string | null = authStore.getState().token;
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("cost", vacation.cost.toString());
        if (vacation.imageName && vacation.imageName[0]) {
            formData.append("image", vacation.imageName[0]);
        }
        try {
            const response = await axios.post<Vacation>(
                `${appConfig.apiAddress}vacation`, formData, {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.AddVacation, payload: response.data});
            return response.data;
        } catch (error) {
            const myErr = error as AxiosError;
            const data = myErr.response?.data as {error: string};
            console.error(data);
            throw error;
        }

    }

    async updateVacation1(id: number, vacation: Vacation): Promise<Vacation> {
        const token: string | null = authStore.getState().token;
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("cost", vacation.cost.toString());
        if (vacation.imageName && vacation.imageName[0]) {
            formData.append("image", vacation.imageName[0]);
        }
        try {
            const response = await axios.put<Vacation>(
                `${appConfig.apiAddress}vacation/${id}`, formData, {headers: { Authorization: "Bearer " + token }}
            );
            vacationStore.dispatch({type: VacationActionType.UpdateVacation, payload: response.data});
            return response.data;
        } catch (error) {
            // throw new Error("Failed to add Vacation");
            const myErr = error as AxiosError;
            const data = myErr.response?.data as {error: string};
            console.error(data);
            throw error;
        }

    }
}

export const vacationService = new VacationService();