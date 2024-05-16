import LoadingIndicator from '@/components/LoadingIndicator';
import { TanStackDevtools } from '@/components/TanstackDevtools';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, redirect } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

// This is the root route. It is the parent of all the other routes. It is the first route that is checked when the user navigates to a new page.
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  // This function is called when the user navigates to a new page. It is used to check if the user is logged in. If the user is not logged in, they are redirected to the login page.
  loader: ({ location }) => {
    if (location.pathname === '/') {
      if (!localStorage.getItem('user')) {
        // If user is not found in local storage, redirect to /login page
        throw redirect({
          to: '/login',
          params: { from: location.pathname }
        });
      } else {
        // If user is found redirect to /me
        throw redirect({
          to: '/me'
        });
      }
    }
    if (!localStorage.getItem('user') && location.pathname !== '/login') {
      // If user is not found in local storage, redirect to /login page if not there
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  },
  pendingComponent: () => <LoadingIndicator screen />,
  component: () => (
    <>
      <Outlet />
      <Suspense>
        <TanStackDevtools />
      </Suspense>
    </>
  )
});
