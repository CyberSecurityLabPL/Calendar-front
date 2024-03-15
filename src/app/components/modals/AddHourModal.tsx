"use client"

import { useState } from "react"
import {
    SubmitHandler,
    useForm
} from "react-hook-form"

import { Modal } from "./Modal"
import { Input } from "../inputs/Input"
import { toast } from "react-hot-toast"
import { Hours } from "@/app/hooks/hours/types"
import { useHours } from "@/app/hooks/hours/useHours"
import { useAddHourModal } from "@/app/hooks/useAddHourModal"
import { useQueryClient } from "@tanstack/react-query"

const getCurrentDateFormatted = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const AddHourModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const useModal = useAddHourModal();
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Hours>({
        defaultValues: {
            UserId: '',
            hoursId: '',
            startTime: `${getCurrentDateFormatted()}T08:00:00`,
            endTime: `${getCurrentDateFormatted()}T16:00:00`,
            tasks: "Praca",
        },
    });
    
    const { addHours } = useHours();  

    const onSubmit: SubmitHandler<Hours> = async (data) => {
        
        setIsLoading(true);    

        try {
            const newHourData = await addHours.mutateAsync(data, {
                onSuccess: () => {
                    toast.success('Wpis dodany pomyślnie');
                    useModal.onClose();
                    queryClient
                },

                onError: () => {
                    toast.error("Wystąpił błąd podczas dodawania wpisu");
                }
            });
        } catch (error) {
            console.error("Error updating hour status:", error);
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                id="tasks"
                label="Zadania"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="startTime"
                label="Rozpoczęcie pracy"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="datetime-local"
            />
            <Input
                id="endTime"
                label="Zakończenie pracy"
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
            isOpen={useAddHourModal().isOpen}
            title="Dodaj wpis"
            actionLabel="Dodaj"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            onClose={useAddHourModal().onClose}
        />
    );
}