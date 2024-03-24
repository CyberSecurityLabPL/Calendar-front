"use client"

import { MouseEvent, use, useEffect, useState } from "react"
import {
    SubmitHandler,
    useForm
} from "react-hook-form"
import { useUserContext } from "@/app/actions/UserContext";
import { Modallogin } from "./modallogin"
import { Input } from "../inputs/Input"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/auth/useAuth"
import { LoginRequest } from "@/app/hooks/auth/types"
import { Button } from "../Button"
import { Eye } from "iconsax-react"
import { useGetMyInfo } from "@/app/hooks/user-info/useGetMyInfo";

export const LoginModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<LoginRequest>({
        defaultValues: {
            email: '',
            password: ''
        },
    });
    const { userInfo } = useGetMyInfo();
    const [userData, setUserData] = useState(null);
    const { user } = useUserContext();
    // Redirect to login page if user is not authenticated
    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, []);
    const { login } = useAuth();

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
                setIsLoading(true);
                try {
                    const loginData = await login.mutateAsync(data, {
                        onSuccess: async () => {
                            toast.success('Zalogowano pomyślnie');
                            setIsLoading(false);
                            router.push("/dashboard");
                        },
                        onError: () => {
                            toast.error("Nie udało się zalogować");
                            setIsLoading(false);
                        }
                    });
        
                } catch (error) {
                    console.error("Error during login:", error);
                    setIsLoading(false);
                }
            };


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

    const footerContent = (
        <Button small={true} 
        outline={true}
        label="Aktywuj konto"
        onClick={() => router.push("/activate")}/>
    )

    return (
        <>
            <div className="flex flex-col z-[222] items-center justify-center gap-8">
            <h1 className="text-center max-[770px]:text-[44px] leading-none font-bold text-[74px] max-[770px]:p-10 text-white z-[223] m-0">👋<span className="text-[#5498DC]">Witaj</span> w <br /><span className="text-[#5498DC]">CSL</span>Schedule📅</h1>
                <Modallogin
                    disabled={isLoading}
                    isOpen={true}
                    actionLabel="Zaloguj się"
                    onSubmit={handleSubmit(onSubmit)}
                    body={bodyContent}
                    footer={footerContent}
                    onClose={() => { }}
                />
            </div>
        </>
    );
}