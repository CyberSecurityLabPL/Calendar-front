import { create } from "zustand";

interface EditUserModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useEditUserModal = create<EditUserModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));