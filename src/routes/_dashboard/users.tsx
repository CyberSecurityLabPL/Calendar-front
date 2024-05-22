import DemoPage from '@/pages/UsersTable/page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/users')({
  component: DemoPage
});
