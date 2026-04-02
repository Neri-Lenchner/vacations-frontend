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
        const token = authStore.getState().token;
        try {
            const response = await axios.get<number>(
                `${appConfig.apiAddress}/vacations/count`,
                {
                    headers: { Authorization: "Bearer " + token }
                }
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
        const token = authStore.getState().token;
        const offset = (page - 1) * limit;

        try {
            const response = await axios.get<Vacation[]>(
                `${appConfig.apiAddress}/vacations?limit=${limit}&offset=${offset}`,
                {
                    headers: { Authorization: "Bearer " + token }
                }
            );
            vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            return response.data;
        } catch (err) {
            console.error("Failed to fetch paginated data", err);
            throw new Error("Failed to fetch paginated data");
        }
    }

    // fetch total + page
    async fetchData(page: number, limit = 10): Promise<void> {

        try {
            await this.fetchTotal();
            const data: Vacation[] = await this.fetchPage(page, limit);
            // vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: data});
        } catch (err) {
            console.error("Failed to fetch data", err);
        }
    }

}

export const vacationService = new VacationService();