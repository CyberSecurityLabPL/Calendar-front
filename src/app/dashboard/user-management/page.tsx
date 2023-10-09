"use client"

import { Button } from "../../components/Button";
import { Navbar } from "../../components/Navbar";
import { useModals } from "../../hooks/useModals";
import { AddUserModal } from "../../components/modals/AddUserModal";
import { Table } from "@/app/components/Table";
import { GetSubordinatesProps } from "@/app/hooks/get-workers/types";
import React, { useEffect, useState } from "react";
import { HoursSidebar } from "@/app/components/dashboard/HoursSidebar";
import { User } from "iconsax-react";
import { UserInfo } from "@/app/hooks/user-info/types";
import { useUserContext } from "@/app/actions/UserContext";
import { useAddUserModal } from "@/app/hooks/useAddUserModal";


export default function UserManagementPage() {

    const addUserModal = useAddUserModal();
    const [userData, setUserData] = useState(null);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = user as any;
                setUserData(userInfo);
            } catch (error) {
                console.error('Error fetching user hours:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <div className="z-50 flex h-[100vh] gap-9 items-start justify-between min-h-screen p-4">
                <Navbar />
                {userData && <HoursSidebar userInfo={userData} />}
                <div className="flex flex-col items-start justify-start gap-4 w-full">
                    <div className="flex items-center justify-start gap-4 w-full border-b-[.5px] pb-4">
                        <User />
                        <h1 className="text-xl font-bold text-center">
                            Lista użytkowników
                        </h1>
                    </div>
                    <div className="flex flex-col gap-4 w-full items-end justify-center p-4 rounded-lg border-[0.5px] bg-white">
                        {user && (user.role === "ROLE_ADMIN") && (
                        <div className="w-[200px]">
                            <Button label={"Dodaj użytkownika"}
                                onClick={addUserModal.onOpen}
                            />
                        </div>
                        )}
                        {user?.role === "ROLE_ADMIN" && (
                            <Table<UserInfo> dataType="usersInfo" />
                        )}
                        {user && (user.role === "ROLE_MANAGER") && (
                            <Table<GetSubordinatesProps> dataType="subordinates" />
                        )}
                    </div>
                </div>
                <AddUserModal />
            </div>
        </>
    )
}