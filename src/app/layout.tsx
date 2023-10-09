"use client"

import './globals.css'
import type { Metadata } from 'next'
import { ToasterProvider } from './providers/ToasterProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserContextProvider from './actions/UserContext';

// export const metadata: Metadata = {
//   title: 'CSLSchedule',
//   description: 'CSLSchedule - schedule your hours',
// }

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className='px-4'>
        <ToasterProvider />
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            {children}
          </UserContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
