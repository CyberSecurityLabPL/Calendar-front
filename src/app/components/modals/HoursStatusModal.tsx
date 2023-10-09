"use client"

import { useEffect, useState } from "react"
import {
    SubmitHandler,
    useForm
} from "react-hook-form"
import { Modal } from "./Modal"
import { Input } from "../inputs/Input"
import { toast } from "react-hot-toast"
import { UpdateHourStatus } from "@/app/hooks/hours-status/types"
import { useModals } from "@/app/hooks/useModals"
import { API_URLS } from "@/app/api/urls"
import { fetchAPI } from "@/app/api/fetchApi"
import { useQueryClient } from "@tanstack/react-query"

export const HoursStatusModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const useModal = useModals();
    const queryClient = useQueryClient();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<UpdateHourStatus>({
        defaultValues: {
            userId: 3,
            month: month,
            year: year,
            hoursSubmitted: true,
        },
    });

    const onSubmit: SubmitHandler<UpdateHourStatus> = async (data) => {
        setIsLoading(true);     
    
        try {
            const url = `${API_URLS.UPDATE_HOURS_STATUS}${data.year}/${data.month}?hoursSubmitted=${data.hoursSubmitted}`;
    
            await fetchAPI(url, {
                method: "PUT",
                body: JSON.stringify(data)
            });
    
            await queryClient.invalidateQueries(["hoursSubmitted"]);
    
            toast.success('Godzinówka oddana pomyślnie');
            setIsLoading(false);
            useModal.onClose();
        } catch (error) {
            console.error("Error updating hour status:", error);
            toast.error("Nie udało się przesłać godzinówki");
            setIsLoading(false);
        }
    };
    

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                id="year"
                label="Rok"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="month"
                label="Miesiąc"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={useModals().isOpen}
            title="Oddaj godzinówkę"
            actionLabel="Oddaj"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            onClose={useModals().onClose}
        />
    );
}