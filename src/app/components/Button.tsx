"use client"

import { IconType } from "react-icons";

interface ButtonProps {
    label?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    className?: string;
    onSubmit?: () => void;
}

export const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    className
}: ButtonProps) => {
    return (
        <button onClick={onClick} 
        disabled={disabled}
        className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full 
        ${outline ? 'bg-white' : 'bg-[#5498DC]'} 
        ${outline ? 'border-black' : 'border-[#5498DC]'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-base' : 'text-md'}
        ${small ? 'font-normal' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}`}>
            {Icon && (
                <Icon size={24} 
                className="absolute left-4 top-3"/>
            )}
            {label}
        </button>
    )
}