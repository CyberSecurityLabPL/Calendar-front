import hoursTable from '@/pages/Users/components/indexcopy';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/hoursTable')({
  component: hoursTable
});
