"use client"

import { useState } from "react"
import {
    SubmitHandler,
    useForm
} from "react-hook-form"
import { Modal } from "./Modal"
import { Input } from "../inputs/Input"
import { toast } from "react-hot-toast"
import { AddUserRequest } from "@/app/hooks/user/types"
import { useAddUser } from "@/app/hooks/user/useAddUser"
import { useModals } from "@/app/hooks/useModals"
import { useQueryClient } from "@tanstack/react-query"
import { useAddUserModal } from "@/app/hooks/useAddUserModal"

export const AddUserModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const useModal = useAddUserModal();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<AddUserRequest>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            companyId: 0,
            role: "",
            workStart: "",
            position: "",
            contract: "",
        },
    });

    const { addUser } = useAddUser();

    const onSubmit: SubmitHandler<AddUserRequest> = async (data) => {

        setIsLoading(true);

        const newUserData = await addUser.mutateAsync(data, {

            onSuccess: () => {
                toast.success('Użytkownik dodany pomyślnie');
                useModal.onClose
                setIsLoading(false);

                queryClient.invalidateQueries({ queryKey: ["firstName", "lastName", "email", "companyId", "role", "workStart", "position", "contract"] });
            },

            onError: () => {
                toast.error("Użytkownik nie został dodany");
                setIsLoading(false);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="firstName"
                label="Imię"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="lastName"
                label="Nazwisko"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="companyId"
                label="ID firmy"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="role"
                label="Rola użytkownika"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="contract"
                label="Rodzaj umowy"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="position"
                label="Stanowisko"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="workStart"
                label="Data rozpoczęcia pracy"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="datetime-local"
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={useModal.isOpen}
            title="Dodaj nowego użytkownika"
            actionLabel="Dodaj"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            onClose={useModal.onClose}
        />
    );
}