export interface GetHourStatus {
    userId: number,
    month: number,
    year: number,
    hoursSubmitted: boolean
}

export interface UpdateHourStatus {
    userId: number,
    month: number,
    year: number,
    hoursSubmitted: boolean
}