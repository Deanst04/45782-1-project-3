import type VacationDraft from "./Vacation-draft";

export default interface Vacation extends VacationDraft {
    id: string,
    createdAt: string,
    updatedAt: string,
}