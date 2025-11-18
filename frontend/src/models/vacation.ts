import type VacationDraft from "./vacation-draft";

export default interface Vacation extends VacationDraft {
    id: string,
    createdAt: string,
    updatedAt: string,
    followerCount: number,
    isFollowed: boolean
}