export interface Hours {
  hoursId: string;
  startTime: Date;
  endTime: Date;
  tasks: string;
}
export interface HoursRequest extends Hours {
  id?: string;
  hoursId: string;
}
interface HoursFieldNames {
  [key: string]: string;
}

const hoursFieldNames: HoursFieldNames = {
  startTime: 'Rozpoczęcie pracy',
  endTime: 'Zakończenie pracy',
  task: 'Zadania'
};

export default hoursFieldNames;
