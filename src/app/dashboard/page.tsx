"use client"

import { useRouter } from "next/navigation";
import { useUserContext } from "../actions/UserContext";
import { useGetMyInfo } from "../hooks/user-info/useGetMyInfo";
import { Blobs } from "../components/Blobs";

export default function Dashboard() {
    const router = useRouter();
    const { setUser } = useUserContext();
    const { userInfo } = useGetMyInfo();

    if (!userInfo) return null;

    const redirectTo = (path: string) => {
        setTimeout(() => {
            router.push(path);
        }, 1000);
    };

    if (userInfo.role === 'ROLE_USER') {
        
        setUser(userInfo);

        redirectTo("/dashboard/calendar");

    } else if (userInfo.role === 'ROLE_ADMIN' || userInfo.role === 'ROLE_MANAGER') {
        
        setUser(userInfo);

        redirectTo("/dashboard/user-management");

    }


    return (
        <>
            <Blobs />
        </>
    )
}