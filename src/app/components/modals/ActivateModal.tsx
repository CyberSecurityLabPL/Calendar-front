"use client"

import { useState } from "react"
import {
    SubmitHandler,
    useForm
} from "react-hook-form"

import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Heading } from "../Heading"
import { Input } from "../inputs/Input"
import { Modal } from "./Modal"
import { useActivation } from "@/app/hooks/activation/useActivation"
import { ActivationRequest } from "@/app/hooks/activation/types"
import { Eye } from "iconsax-react"

export const ActivateModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<ActivationRequest>({
        defaultValues: {
            activationCode: '',
            password: ''
        },
    });

    const { activation } = useActivation();

    const onSubmit: SubmitHandler<ActivationRequest> = async (data) => {

        setIsLoading(true);

        const loginData = await activation.mutateAsync(data, {

            onSuccess: () => {
                toast.success('Konto zostało aktywowane!');
                setIsLoading(false);
                router.push("/login");
            },

            onError: () => {
                toast.error("Nie udało się aktywować konta!");
                setIsLoading(false);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Witaj w CSLSchedule!"
                subtitle="Aktywuj swoje konto =)"
            />
            <Input
                id="activationCode"
                label="Kod aktywacyjny"
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
        </div>
    )

    return (
        <>
            {isLoading && <div className="flex justify-center items-center w-full h-[550px] rounded-lg bg-white"> Loading... </div>}
            <Modal
                disabled={isLoading}
                isOpen={true}
                actionLabel="Aktywuj konto"
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                onClose={() => { }}
            />
        </>
    );
}