import {
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { ModalContextInterface, ModalProviderProps, ModalState } from "../types";
import { ModalContext } from "./modal.ctx";



/**
 * Manages the application's active modal.
 *
 * Only one modal can be displayed at a time. Opening another modal
 * replaces the currently active modal.
 */
export default function ModalProvider({
    children,
}: ModalProviderProps) {
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
    });

    /**
     * Opens a modal and renders the provided content.
     */
    const openModal = (content: ReactNode): void => {
        setModalState({
            isOpen: true,
            content,
        });
    };

    /**
     * Closes the active modal and removes its content from memory.
     */
    const closeModal = (): void => {
        setModalState({
            isOpen: false,
        });
    };

    /**
     * Allows the Escape key to close the active modal.
     */
    useEffect(() => {
        if (!modalState.isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Prevent scrolling when modal is opened
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [modalState.isOpen]);

    const value: ModalContextInterface = {
        openModal,
        closeModal,
    }

    return (
        <ModalContext.Provider value={value}>
            {children}

            {modalState.isOpen &&
                createPortal(
                    <div
                        className="
                        fixed inset-0 z-50
                        flex items-center justify-center
                        bg-black/64 p-4
                        backdrop-blur-sm
                        sm:p-6
                    "
                        onMouseDown={closeModal}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                            className="
                            max-h-[90vh] w-full max-w-4xl
                            overflow-y-auto rounded-2xl bg-white
                            p-6 shadow-xl
                        "
                            onMouseDown={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            {modalState.content}
                        </div>
                    </div>,
                    document.body,
                )
            }
        </ModalContext.Provider>
    );
}
