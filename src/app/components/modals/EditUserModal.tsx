"use client"

import { useEffect, useState } from "react"
import {
    SubmitHandler,
    useForm
} from "react-hook-form"
import { Modal } from "./Modal"
import { Input } from "../inputs/Input"
import { toast } from "react-hot-toast"
import { API_URLS } from "@/app/api/urls"
import { fetchAPI } from "@/app/api/fetchApi"
import { useQueryClient } from "@tanstack/react-query"
import { EditUserRequest } from "@/app/hooks/user/types"
import { Eye } from "iconsax-react"

export const EditUserModal = (userToEdit: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (userToEdit) {
            setIsOpen(true);
        }
    }, [userToEdit]);


    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<EditUserRequest>({
        defaultValues: {
            firstName: userToEdit.userToEdit.firstName,
            lastName: userToEdit.userToEdit.lastName,
            email: userToEdit.userToEdit.email,
            password: "",
            companyId: 1,
        },
    });

    const onSubmit: SubmitHandler<EditUserRequest> = async (data) => {
        setIsLoading(true);

        try {
            const url = `${API_URLS.EDIT_USER}/${userToEdit.userToEdit.id}`;

            await fetchAPI(url, {
                method: "PUT",
                body: JSON.stringify(data)
            });

            await queryClient.invalidateQueries([userToEdit]);

            toast.success('Dane użytkownika zostały zmienione pomyślnie');
            setIsLoading(false);
            setIsOpen(false);
        } catch (error) {
            console.error("Error while editing user data:", error);
            toast.error("Nie udało się zmienić danych użytkownika");
            setIsLoading(false);
        }
    };


    const bodyContent = (
        <div className="flex flex-col gap-4">
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
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <div className="relative">
                <Input
                    id="password"
                    label="Hasło"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    type={showPassword ? "text" : "password"}
                />
                <button className="absolute right-4 top-4"
                onClick={() => setShowPassword(!showPassword)}>
                    <Eye color="#737373" />
                </button>
            </div>
            <Input
                id="companyId"
                label="ID firmy"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    return (
        <Modal
            isOpen={isOpen}
            disabled={isLoading}
            title="Edytuj użytkownika"
            actionLabel="Edytuj"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            onClose={() => setIsOpen(false)}
        />
    );
}