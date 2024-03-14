"use client"

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Calendar, Clock, LogoutCurve, Profile2User } from "iconsax-react";
import { useUserContext } from "../actions/UserContext";
import { useGetMyInfo } from "@/app/hooks/user-info/useGetMyInfo";



export const Navbar = () => {
    const router = useRouter();
    const { user, setUser } = useUserContext();
    const handleSignOut = () => {
        toast.success('Wylogowano pomyślnie');
        setUser(null);
        router.push('/login');
    };

    return (
        <nav className="flex flex-col h-full items-center justify-between">
            <div className="flex flex-col gap-8 items-center justify-center">
                {user && (user.role === "ROLE_USER") && (
                <Calendar size={24} color="#737373" className="cursor-pointer" />
                )}
                {user && (user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER") && (
                    <>
                        <Profile2User size={24} color="#737373"
                            onClick={() => { router.push("/dashboard/user-management") }}
                            className="cursor-pointer" />
                        <Clock size={24} color="#737373"
                            onClick={() => { router.push("/dashboard/hours") }}
                            className="cursor-pointer" />
                    </>
                )}
            </div>
            <div className="flex">
                <LogoutCurve size={24} color="#737373" onClick={handleSignOut} className="cursor-pointer" />
            </div>
        </nav>
    )
}