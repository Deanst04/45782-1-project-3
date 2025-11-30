import type Vacation from "../../models/vacation";
import type VacationDraft from "../../models/vacation-draft";
import type VacationFollowersCount from "../../models/vacation-followed-count";
import { buildVacationFormData } from "../../utils/build-form";
import AuthAware from "./AuthAware";

export default class AdminServices extends AuthAware {

    async getVacationFollowersCount(): Promise<VacationFollowersCount[]> {
        const response = await this.axiosInstance.get<VacationFollowersCount[]>('/vacations/followers-count')
        return response.data
    }

    async createVacation(draft: VacationDraft): Promise<Vacation> {

        const fd = buildVacationFormData(draft)

        const response = await this.axiosInstance.post<Vacation>('/vacations', fd)
        return response.data
    }

    async deleteVacation(vacationId: string): Promise<boolean> {
        const response = await this.axiosInstance.delete<boolean>(`/vacations/${vacationId}`)
        return response.data
    }

    async editVacation(vacationId: string, draft: VacationDraft): Promise<Vacation> {

        const fd = buildVacationFormData(draft)

        const response = await this.axiosInstance.patch<Vacation>(`/vacations/${vacationId}`, fd)
        return response.data
    }

    async generateCsv(): Promise<Blob> {
        const response = await this.axiosInstance.get(`/vacations/export-csv`, {
            responseType: 'blob'
        })
        return response.data
    }

}