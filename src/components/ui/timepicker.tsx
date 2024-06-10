import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

interface BasicTimePickerProps {
  onClick: (time: string) => void; // Określamy typ onClick jako funkcję, która przyjmuje string i nie zwraca wartości
  onChange: (time: string) => void;
  className?: string;
}

export default function BasicTimePicker({
  onClick,
  className
}: BasicTimePickerProps) {
  const handleTimeChange = (selectedTime: dayjs.Dayjs | null) => {
    if (selectedTime !== null) {
      const formattedTime = selectedTime.format('HH:mm');
      onClick(formattedTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Wybierz godzinę"
        onChange={handleTimeChange}
        className={className}
      />
    </LocalizationProvider>
  );
}
