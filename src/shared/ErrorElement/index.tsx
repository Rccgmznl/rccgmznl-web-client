import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';
import { type To, useNavigate } from 'react-router';

import Logo from '@shared/Logo';

interface ErrorElementProps {
    label?: string;
    subLabel?: string;
    retryLink?: To;
}

export default function ErrorElement({
    label = 'Something went wrong',
    subLabel = "We couldn't complete your request. The issue may be temporary.",
    retryLink,
}: ErrorElementProps) {
    const navigate = useNavigate();

    const handleRetry = () => {
        if (!retryLink) {
            return;
        }

        /*
         * Replace the failed history entry so retrying does not add
         * another copy of the same page to the browser history.
         */
        navigate(retryLink, {
            replace: true,
        });
    };

    const handleGoHome = () => {
        navigate('/', {
            replace: true,
        });
    };

    return (
        <main
            role="alert"
            aria-labelledby="error-heading"
            aria-describedby="error-description"
            className="
                relative grid min-h-screen w-full
                place-items-center overflow-hidden
                bg-neutral-900 px-5 py-12
                text-white
            "
        >
            {/* Decorative background glows */}
            <div
                aria-hidden="true"
                className="
                    absolute left-1/2 top-1/2
                    size-96 -translate-x-1/2
                    -translate-y-1/2 rounded-full
                    bg-primary-900/[0.05] blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute right-[12%] top-[18%]
                    size-48 rounded-full
                    bg-accent-900/[0.04] blur-3xl
                "
            />

            <section
                className="
                    relative flex w-full max-w-lg
                    flex-col items-center text-center
                "
            >
                <Logo
                    className="
                        h-16 w-auto max-w-[10rem]
                        object-contain sm:h-20
                        sm:max-w-[13rem]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        relative mt-8 grid size-16
                        place-items-center rounded-full
                        border border-accent-900/20
                        bg-accent-900/10
                        text-2xl text-accent-600
                        shadow-lg shadow-black/20
                    "
                >
                    <FiAlertTriangle />
                </div>

                <p
                    className="
                        mt-6 text-xs font-bold uppercase
                        tracking-[0.2em] text-accent-600
                    "
                >
                    Unable to continue
                </p>

                <h1
                    id="error-heading"
                    className="
                        mt-3 text-2xl font-bold
                        tracking-[-0.025em] text-white
                        sm:text-3xl
                    "
                >
                    {label}
                </h1>

                <p
                    id="error-description"
                    className="
                        mt-4 max-w-md text-sm
                        leading-6 text-neutral-400
                        sm:text-base sm:leading-7
                    "
                >
                    {subLabel}
                </p>

                <p
                    className="
                        mt-3 text-xs leading-5
                        text-neutral-500
                    "
                >
                    If the problem continues, please contact the church team.
                </p>

                <div
                    className="
                        mt-8 flex w-full
                        flex-col-reverse gap-3
                        sm:w-auto sm:flex-row
                    "
                >
                    <button
                        type="button"
                        onClick={handleGoHome}
                        className="
                            inline-flex min-h-12
                            cursor-pointer items-center
                            justify-center gap-2 rounded-full
                            border border-white/15
                            bg-white/[0.05] px-6
                            text-sm font-semibold text-white
                            transition
                            hover:border-white/30
                            hover:bg-white/10
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white/60
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-neutral-900
                        "
                    >
                        <FiHome aria-hidden="true" />
                        Go home
                    </button>

                    {retryLink && (
                        <button
                            type="button"
                            onClick={handleRetry}
                            className="
                                group inline-flex min-h-12
                                cursor-pointer items-center
                                justify-center gap-2 rounded-full
                                bg-primary-900 px-6
                                text-sm font-semibold text-white
                                transition
                                hover:bg-primary-800
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary-900
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-neutral-900
                            "
                        >
                            <FiRefreshCw
                                aria-hidden="true"
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:rotate-180
                                "
                            />
                            Try again
                        </button>
                    )}
                </div>
            </section>
        </main>
    );
}
