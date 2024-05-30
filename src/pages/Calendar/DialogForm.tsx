import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Hours, HoursRequest } from '@/types/Hours';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { UseFormSetValue } from 'react-hook-form';

interface DialogFormProps {
  isDialogOpen: boolean;
  setDialogOpened: (open: boolean) => void;
  selectedDate: string | null;
  workStart: string;
  setWorkStart: (value: string) => void;
  workEnd: string;
  setWorkEnd: (value: string) => void;
  tasks: string;
  setTasks: (value: string) => void;
  hours?: Hours;
  reset: () => void;
  setValue: UseFormSetValue<HoursRequest>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: any;
}

interface TimePickerDetail {
  value: string;
}

const DialogForm = ({
  isDialogOpen,
  setDialogOpened,
  selectedDate,
  workStart,
  setWorkStart,
  workEnd,
  setWorkEnd,
  tasks,
  setTasks,
  hours,
  reset,
  setValue,
  handleSubmit,
  register
}: DialogFormProps) => {
  return (
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
      <form onSubmit={handleSubmit}>
        <div className="text-center text-xl">{selectedDate}</div>
        <VerticalLayout className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right col-span-2">
              Godzina rozpoczęcia pracy
            </Label>
            <div className="col-span-2">
              <TimePicker
                value={workStart}
                onValueChanged={({ detail }: { detail: TimePickerDetail }) => {
                  setWorkStart(detail.value);
                  setValue(
                    'startTime',
                    new Date(`${selectedDate}T${detail.value}:00`)
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right col-span-2">
              Godzina zakończenia pracy
            </Label>
            <div className="col-span-2">
              <TimePicker
                value={workEnd}
                onValueChanged={({ detail }: { detail: TimePickerDetail }) => {
                  setWorkEnd(detail.value);
                  setValue(
                    'endTime',
                    new Date(`${selectedDate}T${detail.value}:00`)
                  );
                }}
              />
            </div>
          </div>
          <div className="grid cols-12 text-center">
            <TextArea
              label="Task"
              value={tasks}
              onValueChanged={event => {
                setTasks(event.detail.value);
              }}
              {...register('tasks')}
            />
          </div>
          <div className="flex w-full basis-1/2 gap-4 mt-4">
            <Button
              className="basis-1/2"
              type="button"
              variant="outline"
              onClick={() => setDialogOpened(false)}>
              Wyjdź
            </Button>
            <Button className="basis-1/2" type="submit">
              Zapisz
            </Button>
          </div>
        </VerticalLayout>
      </form>
    </Dialog>
  );
};

export default DialogForm;
