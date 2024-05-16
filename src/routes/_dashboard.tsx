import { Dashboard } from '@/pages/Dashboard';
import { createFileRoute } from '@tanstack/react-router';

// This is a layout route. Inside is an important component '<Outlet />'. All the components that are nested inside this route will be rendered inside the Outlet component.
export const Route = createFileRoute('/_dashboard')({
  component: Dashboard
});
