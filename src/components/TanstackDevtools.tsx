import React from 'react';

export const TanStackDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then(res => ({
          default: () => res.TanStackRouterDevtools({ position: 'top-right' })
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
