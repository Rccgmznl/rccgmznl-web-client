import type { ReactNode } from "react";
import { FiEdit3 } from "react-icons/fi";

import { useModalContext } from "@features/modal/providers";
import { useAuthContext } from "@features/auth";

interface EditModeBtnProps {
    content: ReactNode;
    label?: string;
}

export default function EditModeBtn({
    content,
    label = "Edit section",
}: EditModeBtnProps) {
    const { openModal } = useModalContext();
    const { authState } = useAuthContext();

    if (authState.status !== "authenticated") {
        return null;
    }

    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={() => openModal(content)}
            className="
                absolute -right-3 -top-3 z-40
                grid size-10 place-items-center
                cursor-pointer rounded-full
                border-2 border-white
                bg-primary-900 text-white
                shadow-lg shadow-black/30
                transition duration-200
                hover:scale-110
                hover:bg-primary-800
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary-900
                focus-visible:ring-offset-2
                motion-reduce:transition-none
            "
        >
            <FiEdit3 aria-hidden="true" className="text-base" />
        </button>
    );
}
