import Logo from '@shared/Logo';

interface LoadingProps {
    label?: string;
    subLabel?: string;
}

export default function Loading({
    label = 'Preparing your experience',
    subLabel = 'Please wait while we get everything ready for you.',
}: LoadingProps) {
    return (
        <main
            role="status"
            aria-live="polite"
            aria-label={label}
            className="
                relative grid min-h-screen w-full
                place-items-center overflow-hidden
                bg-neutral-900 px-5 text-white
            "
        >
            <div
                aria-hidden="true"
                className="
                    absolute left-1/2 top-1/2
                    size-80 -translate-x-1/2 -translate-y-1/2
                    rounded-full bg-primary-900/[0.06]
                    blur-3xl
                "
            />

            <div className="relative flex max-w-md flex-col items-center text-center">
                <div
                    aria-hidden="true"
                    className="
                        relative grid size-20
                        place-items-center
                        sm:size-24
                    "
                >
                    <span
                        className="
                            absolute inset-0 rounded-full
                            border-2 border-white/10
                        "
                    />

                    <span
                        className="
                            absolute inset-0 animate-spin
                            rounded-full border-2
                            border-transparent
                            border-r-primary-900
                            border-t-primary-900
                            motion-reduce:animate-none
                        "
                    />

                    <div
                        className="
                            relative z-10 flex
                            h-12 w-14 items-center
                            justify-center
                            sm:h-14 sm:w-16
                        "
                    >
                        <Logo
                            className="
                                max-h-full max-w-full
                                h-auto w-auto
                                object-contain
                            "
                        />
                    </div>
                </div>

                <h1 className="mt-6 text-base font-bold text-primary-900 sm:text-lg">
                    {label}
                </h1>

                <p className="mt-2 text-sm leading-6 text-neutral-400">
                    {subLabel}
                </p>

                <div
                    aria-hidden="true"
                    className="mt-5 flex items-center gap-1.5"
                >
                    <span className="size-1.5 animate-pulse rounded-full bg-primary-900" />
                    <span className="size-1.5 animate-pulse rounded-full bg-primary-900 [animation-delay:150ms]" />
                    <span className="size-1.5 animate-pulse rounded-full bg-primary-900 [animation-delay:300ms]" />
                </div>

                <span className="sr-only">Loading, please wait.</span>
            </div>
        </main>
    );
}
