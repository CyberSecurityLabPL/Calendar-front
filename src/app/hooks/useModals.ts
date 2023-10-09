import { create } from "zustand";

interface ModalsProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useModals = create<ModalsProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));