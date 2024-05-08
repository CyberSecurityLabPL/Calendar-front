"use client"

import {
    FieldErrors,
    UseFormRegister
} from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<any>
    errors: FieldErrors
}

export const Input = ({
    label,
    id,
    type = "text",
    disabled,
    required,
    register,
    errors
}: InputProps) => {


    return (
        <div className="w-full p-1 relative">
            <input
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={type}
                className={`peer w-full py-2 pl-4 pt-6 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`}>
            </input>
            <label className={`absolute text-md duration-150 transform -translate-y-2 top-4 left-4 z-10 origin-[0]
                peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id] ? 'text-rose-50' : 'text-zinc-400'}`}>
                {label}
            </label>
        </div>
    )
}