import Users from '@/pages/Users/components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/users')({
  component: Users
});
