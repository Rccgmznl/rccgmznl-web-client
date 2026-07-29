import type { ReactNode } from "react";

export interface ModalProviderProps {
    children: ReactNode;
}

export type ModalState =
    | {
        isOpen: true;
        content: ReactNode;
    }
    | {
        isOpen: false;
    };

export interface ModalContextInterface {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}
