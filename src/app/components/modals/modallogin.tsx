"use client"

import { useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
import { useUserContext } from "@/app/actions/UserContext";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
}

export const Modallogin: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    disabled,
    footer
}) => {

    const [showModal, setShowModal] = useState(isOpen);
    const { user } = useUserContext()

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose, disabled]);

    

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);


    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="justify-center pt-10 max-[770px]:grid items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[222] outline-none focus:outline-none bg-neutral-800/10">
                <div className="relative rounded-none pt-10 w-[600px] md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    {/* Content */}
                    <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="translate max-[770px]:p-10 h-full lg:h-auto md:h-auto border-0 max-[770px]:bg-transparent max-[770px]:rounded-none rounded-lg max-[770px]:shadow-none relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* Header */}
                            <div className="flex items-center p-6 rounded-t justify-center relative">
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/* BODY */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <Button disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                    {footer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}