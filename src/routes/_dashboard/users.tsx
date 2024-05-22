import DemoPage from '@/pages/Users';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/users')({
  component: DemoPage
});
