import { create } from "zustand";

interface AddUserModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useAddUserModal = create<AddUserModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));