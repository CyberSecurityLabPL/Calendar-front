import hoursTable from '@/pages/Users/indexcopy';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/hoursTable')({
  component: hoursTable
});
