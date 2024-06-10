import Calendar from '@/pages/Calendar';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/calendar')({
  component: Calendar
});
