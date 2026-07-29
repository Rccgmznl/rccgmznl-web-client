import { FiHome, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router';

import Logo from '@shared/Logo';

export default function NotFoundPage() {
    return (
        <main
            aria-labelledby="not-found-heading"
            aria-describedby="not-found-description"
            className="
                relative grid min-h-screen w-full
                place-items-center overflow-hidden
                bg-neutral-900 px-5 py-12
                text-white
            "
        >
            {/* Background glow */}
            <div
                aria-hidden="true"
                className="
                    absolute left-1/2 top-1/2
                    size-96 -translate-x-1/2
                    -translate-y-1/2 rounded-full
                    bg-primary-900/[0.06] blur-3xl
                "
            />

            <section
                className="
                    relative flex w-full max-w-lg
                    flex-col items-center text-center
                "
            >
                <Link
                    to="/"
                    aria-label="RCCG Mount Zion home"
                    className="
                        rounded-lg
                        transition-opacity hover:opacity-90
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-900
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-neutral-900
                    "
                >
                    <Logo
                        className="
                            h-16 w-auto max-w-[10rem]
                            object-contain
                            sm:h-20 sm:max-w-[13rem]
                        "
                    />
                </Link>

                <div
                    aria-hidden="true"
                    className="
                        relative mt-8 grid size-16
                        place-items-center rounded-full
                        border border-primary-900/20
                        bg-primary-900/10
                        text-2xl text-primary-900
                        shadow-lg shadow-black/20
                    "
                >
                    <FiMapPin />
                </div>

                <p
                    className="
                        mt-6 font-serif text-7xl font-bold
                        leading-none text-primary-900
                        sm:text-8xl
                    "
                >
                    404
                </p>

                <h1
                    id="not-found-heading"
                    className="
                        mt-5 text-2xl font-bold
                        tracking-[-0.025em]
                        sm:text-3xl
                    "
                >
                    Page not found
                </h1>

                <p
                    id="not-found-description"
                    className="
                        mt-4 max-w-md text-sm
                        leading-6 text-neutral-400
                        sm:text-base sm:leading-7
                    "
                >
                    The page you are looking for may have been moved, removed,
                    or the address may be incorrect.
                </p>

                <p
                    className="
                        mt-3 text-xs leading-5
                        text-neutral-500
                    "
                >
                    Let&apos;s help you find your way back.
                </p>

                <Link
                    to="/"
                    className="
                        mt-8 inline-flex min-h-12
                        items-center justify-center gap-2
                        rounded-full bg-primary-900
                        px-7 text-sm font-semibold
                        text-white transition
                        hover:bg-primary-800
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-900
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-neutral-900
                    "
                >
                    <FiHome aria-hidden="true" />
                    Go home
                </Link>
            </section>
        </main>
    );
}
