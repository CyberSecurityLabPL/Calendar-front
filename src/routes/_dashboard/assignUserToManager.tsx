import assignUserToManager from '@/pages/Users/components/assignUserToManager';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/assignUserToManager')({
  component: assignUserToManager
});
