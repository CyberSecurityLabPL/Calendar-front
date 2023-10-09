"use client"

import { Hours } from "@/app/hooks/hours/types";
import { MyInfo } from "@/app/hooks/user-info/types";
import Image from "next/image";
import style from "@/app/styles/Blobs.module.css";
import { useUserContext } from "@/app/actions/UserContext";

interface HoursSidebarProps {
    userHours?: Hours[];
    userInfo: MyInfo;
}

export const HoursSidebar = ({
    userHours,
    userInfo,
}: HoursSidebarProps) => {

    const { user } = useUserContext();

    return (
        <div className="flex flex-col gap-8 w-[500px]">
            <div className="flex w-[400px] items-start gap-4">
                <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#5498DC] text-white font-bold uppercase text-2xl rounded-lg">
                    <p>
                        {userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}
                    </p>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold m-0 capitalize">{userInfo.firstName} {userInfo.lastName}</h2>
                    <p className="text-[#737373] font-semibold text-base w-[300px] truncate">{userInfo.companyDto.name}</p>
                </div>
            </div>
            {user && (user.role === "ROLE_USER") && (
                <>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl text-[#737373] font-bold">Twoje wpisy</h2>
                        <div className="flex flex-col gap-4">
                            {userHours
                                ?.filter((hour) => {
                                    const currentDate = new Date();

                                    const currentWeekStartDate = new Date(
                                        currentDate.getFullYear(),
                                        currentDate.getMonth(),
                                        currentDate.getDate() - currentDate.getDay()
                                    );

                                    const currentWeekEndDate = new Date(
                                        currentWeekStartDate.getFullYear(),
                                        currentWeekStartDate.getMonth(),
                                        currentWeekStartDate.getDate() + 6
                                    );

                                    const startTime = new Date(hour.startTime);

                                    return startTime >= currentWeekStartDate && startTime <= currentWeekEndDate;
                                })
                                .map((hour, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between w-full bg-white rounded-lg py-2 px-4 border-[.5px]">
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-base font-semibold">
                                                {hour.startTime.toString().split('T')[0]}
                                            </h3>
                                            <p className="text-base font-semibold text-[#737373]">
                                                {hour.tasks}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            )}
            <div className={`absolute top-0 -z-20 ${style.hours_blob}`}>
                <Image src="/blobs/dashboard-blob.svg" width={700} height={700} alt="" />
            </div>
        </div>
    );
};
