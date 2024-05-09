import { LoginPage } from '@/pages/LoginPage';
import { createFileRoute } from '@tanstack/react-router';

// A basic route showing the LoginPage component when the user navigates to '/login'
export const Route = createFileRoute('/login')({
  component: LoginPage
});
