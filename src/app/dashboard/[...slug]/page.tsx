"use client";

import { CalendarComponent } from "../../components/dashboard/calendar/Calendar";
import { Navbar } from "../../components/Navbar";
import { useGetAllHours } from "../../hooks/hours/useGetAllHours";
import { HoursSidebar } from "@/app/components/dashboard/HoursSidebar";
import { useUserContext } from "@/app/actions/UserContext";
import React, { useEffect, useState } from "react";
import { User } from "iconsax-react";
import toast from "react-hot-toast";
import { UserInfo } from "@/app/hooks/user-info/types";
import { useAddUserModal } from "@/app/hooks/useAddUserModal";
import { useRouter } from "next/navigation";
import { useGetMyInfo } from "@/app/hooks/user-info/useGetMyInfo";


export default function Calendar({ params }: { params: { slug: string } }) {
    const userId = params.slug[1]
    const { hourData } = useGetAllHours(userId);
    const { user } = useUserContext();
    const router = useRouter();
    const { setUser } = useUserContext();
    const { userInfo } = useGetMyInfo();
    const addUserModal = useAddUserModal();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else {
                const fetchData = async () => {
                    try {
                        const userInfo = user as any;
                        setUserData(userInfo);
                    } catch (error) {
                        console.error('Error fetching user hours:', error);
                        toast.success('nie ma cie');
                    }
                };
                fetchData();
        }
    }, []);


  return (
    <div className="flex h-[100vh] gap-9 items-start justify-between min-h-screen p-4">
      <Navbar />
      {user && <HoursSidebar userHours={ hourData } userInfo={ user } />}
      <CalendarComponent userHours={ hourData } userId={ userId || user?.id as any } />
    </div>
  );
}
