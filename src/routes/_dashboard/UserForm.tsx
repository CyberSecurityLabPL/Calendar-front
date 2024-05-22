import { UserForm } from '@/pages/UserForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/UserForm')({
  component: UserForm
});
