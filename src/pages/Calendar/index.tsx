import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { useState } from 'react';

function Calendar() {
  const [isDialogOpen, setDialogOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [workStart, setWorkStart] = useState<string>('08:00');
  const [workEnd, setWorkEnd] = useState<string>('16:00');

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setDialogOpened(true);
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

      <Dialog
        opened={isDialogOpen}
        onOpenedChanged={({ detail }) => {
          setDialogOpened(detail.value);
        }}
        footerRenderer={() => (
          <>
            <button style={{ display: 'none' }}></button>
          </>
        )}>
        <div className="text-center text-xl">{selectedDate}</div>
        <VerticalLayout className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-2 ">
              Godzina rozpoczęcia pracy
            </Label>
            <div className="col-span-2">
              <TimePicker onInput={() => setWorkStart} value={workStart} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-2 ">
              Godzina zakończenia pracy
            </Label>
            <div className="col-span-2">
              <TimePicker onInput={() => setWorkEnd} value={workEnd} />
            </div>
          </div>
          <div className="flex w-full basis-1/2 gap-4 mt-4">
            <Button className="basis-1/2" type="button" variant="outline">
              Wyjdź
            </Button>
            <Button className="basis-1/2" type="submit">
              Zapisz
            </Button>
          </div>
        </VerticalLayout>
      </Dialog>
    </>
  );
}

export default Calendar;
