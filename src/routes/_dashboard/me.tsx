import Me from '@/pages/Me';
import { createFileRoute } from '@tanstack/react-router';

// Routes with _ in the beginning are not visible in the URL.
export const Route = createFileRoute('/_dashboard/me')({
  component: Me
});
