import type VacationDraft from "./vacation-draft";

export default interface Vacation extends VacationDraft {
    id: string,
    createdAt: string,
    updatedAt: string,
    imageName: string,
    followerCount: number,
    isFollowed: boolean
}