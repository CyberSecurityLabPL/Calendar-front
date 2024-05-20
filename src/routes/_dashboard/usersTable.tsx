
import DemoPage from '@/pages/UsersTable/page'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_dashboard/usersTable')({
  component: DemoPage
})