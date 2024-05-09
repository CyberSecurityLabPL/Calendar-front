import LoadingIndicator from '@/components/LoadingIndicator';
import { usersQueryOptions } from '@/hooks/useUsers/usersQueryOptions';
import Users from '@/pages/Users';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/users')({
  //This is pretty cool. This is a preloader function that will run before the component is rendered.
  loader: ({ context: { queryClient } }) => {
    // This will ensure that the data is fetched before the component is rendered. Look in @pages/me for a preloading feature
    queryClient.ensureQueryData(usersQueryOptions);
  },
  pendingComponent: LoadingIndicator,
  component: Users
});
