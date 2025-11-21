import type Vacation from "../../models/vacation";
import AuthAware from "./AuthAware";

export default class VacationServices extends AuthAware {

    async getVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>('/vacations')
        return response.data
    }

}