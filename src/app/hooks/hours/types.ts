export interface Hours {
    id: string;
    UserId: number;
    hoursId: number;
    startTime: string;
    endTime:   string;
    tasks:     string;
}

export interface TotalHours {
    userId: number;
    firstName: string;
    lastName: string;
    totalHours: number;
    month: number,
    year: number,
    hoursSubmitted: boolean
}