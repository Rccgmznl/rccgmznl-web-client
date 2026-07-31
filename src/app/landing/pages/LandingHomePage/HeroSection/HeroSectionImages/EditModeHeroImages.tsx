import { FiBookOpen } from "react-icons/fi";
import type { HeroImage } from "./types";

interface EditModeHeroImagesProps {
    heroImages: HeroImage[];
}

export default function EditModeHeroImages({
    heroImages
}: EditModeHeroImagesProps) {
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        void event;
        return null;
    }

    return (
        <form
            noValidate
            onSubmit={(event) => {
                void handleSubmit(event);
            }}
            className="flex flex-col"
        >
            {/* Editor heading */}
            <header className="border-b border-neutral-200 pb-5">
                <div className="flex items-start gap-4">
                    <span
                        className="
                            grid size-11 shrink-0
                            place-items-center rounded-2xl
                            bg-primary-900/10
                            text-xl text-primary-900
                        "
                    >
                        <FiBookOpen aria-hidden="true" />
                    </span>

                    <div>
                        <p
                            className="
                                text-xs font-bold uppercase
                                tracking-[0.18em]
                                text-primary-900
                            "
                        >
                            Hero section
                        </p>

                        <h2
                            id="modal-title"
                            className="
                                mt-1 text-xl font-bold
                                tracking-[-0.02em]
                                text-neutral-900
                                sm:text-2xl
                            "
                        >
                            Edit Slide Images
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600">
                            Update the images and how the order in which they are displayed
                        </p>
                    </div>
                </div>
            </header>
            {heroImages.length < 0 && (
                <button>Upload Images</button>
            )}
        </form>
    );
}
