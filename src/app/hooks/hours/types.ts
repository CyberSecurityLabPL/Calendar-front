export interface Hours {
    id: string;
    UserId: string;
    hoursId: string;
    startTime: string;
    endTime:   string;
    tasks:     string;
}

export interface TotalHours {
    userId: string;
    firstName: string;
    lastName: string;
    totalHours: number;
    month: number,
    year: number,
    hoursSubmitted: boolean
}