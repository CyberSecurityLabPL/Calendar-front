import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import BasicTimePicker from '@/components/ui/timepicker';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';

function Calendar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [workStart, setWorkStart] = useState<string | null>(null);
  const [workEnd, setWorkEnd] = useState<string | null>(null);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setIsDialogOpen(true);
  };
  const handleWorkStart = (time: any) => {
    setWorkStart(time);
  };
  const handleWorkEnd = (time: any) => {
    setWorkEnd(time);
  };

  return (
    <>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          selectable={true}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="90vh"
          dateClick={handleDateClick}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button style={{ display: 'none' }}></button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">{selectedDate}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right col-span-2 ">
                Godzina rozpoczęcia pracy
              </Label>
              <div className="col-span-2">
                <BasicTimePicker
                  className="z-50"
                  onClick={handleWorkStart}
                  onChange={setWorkStart}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right col-span-2 ">
                Godzina zakończenia pracy
              </Label>
              <div className="col-span-2">
                <BasicTimePicker
                  onClick={handleWorkEnd}
                  onChange={setWorkEnd}></BasicTimePicker>
              </div>
            </div>
            <p>{workStart}</p>
            <p>{workEnd}</p>
          </div>
          <DialogFooter>
            <Button type="submit">Zapisz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Calendar;
