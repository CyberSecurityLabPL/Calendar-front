"use client";

import { CalendarComponent } from "../../components/dashboard/calendar/Calendar";
import { Navbar } from "../../components/Navbar";
import { useGetAllHours } from "../../hooks/hours/useGetAllHours";
import { HoursSidebar } from "@/app/components/dashboard/HoursSidebar";
import { useUserContext } from "@/app/actions/UserContext";

export default function Calendar({ params }: { params: { slug: string } }) {
    const userId = params.slug[1]
    const { hourData } = useGetAllHours(userId);
    const { user } = useUserContext();

  return (
    <div className="flex h-[100vh] gap-9 items-start justify-between min-h-screen p-4">
      <Navbar />
      {user && <HoursSidebar userHours={ hourData } userInfo={ user } />}
      <CalendarComponent userHours={ hourData } userId={ userId || user?.id as any } />
    </div>
  );
}
