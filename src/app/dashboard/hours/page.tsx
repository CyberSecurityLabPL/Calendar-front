"use client"

import { Navbar } from "../../components/Navbar";
import { Table } from "@/app/components/Table";
import { useEffect, useState } from "react";
import { useGetMyInfo } from "@/app/hooks/user-info/useGetMyInfo";
import { HoursSidebar } from "@/app/components/dashboard/HoursSidebar";
import { Clock } from "iconsax-react";
import { TotalHours } from "@/app/hooks/hours/types";
import { useUserContext } from "@/app/actions/UserContext";
import { User } from "iconsax-react";
import toast from "react-hot-toast";
import { useAddUserModal } from "@/app/hooks/useAddUserModal";
import { useRouter } from "next/navigation";

export default function HoursPage() {

    const [userData, setUserData] = useState(null);
    const { user } = useUserContext();
    const router = useRouter();
    const { setUser } = useUserContext();
    const addUserModal = useAddUserModal();

    // Redirect to login page if user is not authenticated
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
    }, [ ]);

    return (
        <>
                <div className="z-50 flex h-[100vh] gap-9 items-start justify-between min-h-screen p-4">
                    <Navbar />
                    {userData && <HoursSidebar userInfo={userData} />}
                    <div className="flex flex-col items-start justify-start gap-4 w-full">
                        <div className="flex items-center justify-start pb-4 gap-4 w-full border-b-[.5px]">
                            <Clock />
                            <h1 className="text-xl font-bold text-center">
                                Godzinówki
                            </h1>
                        </div>
                        <div className="flex flex-col gap-4 w-full items-end justify-center p-4 rounded-lg border-[0.5px] bg-white">
                            <Table<TotalHours> dataType={"totalHours"} />
                        </div>
                    </div>
                </div>
        </>
    )
};