import { create } from "zustand";

interface AddHourModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useAddHourModal = create<AddHourModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));