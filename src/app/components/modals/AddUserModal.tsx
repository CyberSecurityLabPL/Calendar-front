"use client"

import { useEffect, useState } from "react"
import {
    SubmitHandler,
    useForm,
    Controller
} from "react-hook-form"
import { Modal } from "./Modal"
import { Input } from "../inputs/Input"
import { toast } from "react-hot-toast"
import { AddUserRequest } from "@/app/hooks/user/types"
import { useAddUser } from "@/app/hooks/user/useAddUser"
import { useModals } from "@/app/hooks/useModals"
import { useQueryClient } from "@tanstack/react-query"
import { useAddUserModal } from "@/app/hooks/useAddUserModal"
import useCompany from "@/app/hooks/company/useCompany"
import Select from 'react-select';
import { ROLES, CONTRACTS, COMPANIES } from '../inputs/SelectInput'

export const AddUserModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const useModal = useAddUserModal();
    const queryClient = useQueryClient();
    const { data } = useCompany();
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {
            errors,
        },
    } = useForm<AddUserRequest>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            companyId: "",
            role: "",
            workStart: new Date(),
            position: "",
            contract: "",
        },
    });
    useEffect(() => {
        console.log(data);
    }, [data]);



    console.log(watch('role'))
    
    const bodyContent = (
        <div className="flex-auto flex-col gap-4">

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

            <Select
                className="p-1 opacity-100"
                options={ROLES}
                isDisabled={isLoading}
                placeholder="Wybierz role..."
                onChange={e => {
                    if (!e) return;
                    setValue("role", e.value);
                }}
            />

            <Select
                className="p-1"
                options={CONTRACTS}
                isDisabled={isLoading}
                placeholder="Wybierz rodzaj umowy..."
                onChange={e => {
                    if (!e) return;
                    setValue("contract", e.value);
                }}
            />
            <Select
                className="p-1"
                options={COMPANIES}
                isDisabled={isLoading}
                placeholder="Wybierz firmę..."
                onChange={e => {
                    if (!e) return;
                    setValue("companyId", e.value);
                }}
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

    const { addUser } = useAddUser();

    const onSubmit: SubmitHandler<AddUserRequest> = async (data) => {
        // setIsLoading(true);

        console.log(data)

        const newUserData = await addUser.mutateAsync({ ...data, workYears: (new Date()).getFullYear() - (new Date(data.workStart)).getFullYear() }, {
            onSuccess: () => {
                toast.success('Użytkownik dodany pomyślnie');
                useModal.onClose(); // Call the onClose function
                setIsLoading(false);

                queryClient.invalidateQueries(["firstName", "lastName", "email", "companyId", "role", "workStart", "position", "contract"]); // Pass an array of strings as the queryKey
            },
            onError: () => {
                toast.error("Użytkownik nie został dodany");
                setIsLoading(false);
            }
        });
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={useModal.isOpen}
            title="Dodaj nowego użytkownika"
            actionLabel="Dodaj"
            onSubmit={() => handleSubmit(onSubmit)()}
            body={bodyContent}
            onClose={useModal.onClose}
        />
    );
}