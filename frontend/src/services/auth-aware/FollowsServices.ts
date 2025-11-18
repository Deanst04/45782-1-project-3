import type Follow from "../../models/follow";
import AuthAware from "./AuthAware";

export default class FollowsServices extends AuthAware {

    async follow(vacationId: string): Promise<Follow> {
        const response = await this.axiosInstance.post<Follow>(`/follows/follow/${vacationId}`)
        return response.data
    }

    async unfollow(vacationId: string): Promise<boolean> {
        const response = await this.axiosInstance.post<boolean>(`/follows/unfollow/${vacationId}`)
        return response.data
    }

}