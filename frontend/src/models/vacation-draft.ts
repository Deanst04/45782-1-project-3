export default interface VacationDraft {
    destination: string,
    description: string,
    startDate: Date,
    endDate: Date,
    price: number,
    imageUrl: File
}