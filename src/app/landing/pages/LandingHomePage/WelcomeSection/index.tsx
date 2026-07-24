import { Link } from "react-router";
import {
    FiArrowUpRight,
    FiCalendar,
    FiHeart,
} from "react-icons/fi";

import unavailableImg from "@shared/images/unavailable.png";

const welcomeActions = [
    {
        label: "First Time? Let's Begin",
        to: "/new",
        icon: FiArrowUpRight,
        primary: true,
    },
    {
        label: "See What’s Happening",
        to: "/events",
        icon: FiCalendar,
        primary: false,
    },
    {
        label: "How We Worship",
        to: "/about",
        icon: FiHeart,
        primary: false,
    },
];

export default function WelcomeSection() {
    return (
        <section
            aria-labelledby="welcome-heading"
            className="relative isolate overflow-hidden bg-white text-neutral-900"
        >
            {/* Decorative background image */}
            <img
                src={unavailableImg}
                alt=""
                aria-hidden="true"
                className="
                    absolute inset-0 -z-30
                    h-full w-full
                    object-cover object-center
                    opacity-[0.04] grayscale
                "
            />

            {/* Very light tint */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-20 bg-white/90"
            />

            {/* Decorative glow */}
            <div
                aria-hidden="true"
                className="
                    absolute -left-32 top-1/2 -z-10
                    size-[28rem] -translate-y-1/2
                    rounded-full bg-primary-300/20 blur-3xl
                "
            />

            <div
                className="
                    mx-auto grid w-full max-w-[90rem]
                    items-center gap-12
                    px-5 py-16
                    sm:px-8 sm:py-20
                    lg:min-h-[46rem]
                    lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.95fr)]
                    lg:gap-16 lg:px-12 lg:py-24
                "
            >
                {/* Content */}
                <div className="relative z-10 max-w-2xl">
                    <div className="mb-6 flex items-center gap-4">
                        <span
                            aria-hidden="true"
                            className="h-px w-10 bg-primary-900"
                        />

                        <p
                            className="
                                text-xs font-bold uppercase
                                tracking-[0.22em] text-primary-900
                            "
                        >
                            You are welcome here
                        </p>
                    </div>

                    <h2
                        id="welcome-heading"
                        className="
                            font-serif text-5xl font-semibold
                            italic leading-none tracking-[-0.04em]
                            text-neutral-900
                            sm:text-6xl
                            lg:text-7xl
                        "
                    >
                        Welcome
                    </h2>

                    <p
                        className="
                            mt-6 max-w-xl
                            text-base leading-7 text-neutral-700
                            sm:text-lg sm:leading-8
                        "
                    >
                        It is my{" "}
                        <strong className="font-semibold text-neutral-900">
                            pleasure
                        </strong>{" "}
                        to welcome all the brothers and sisters of the{" "}
                        <strong className="font-semibold text-neutral-900">
                            church
                        </strong>
                        . We want to thank everyone for taking time out of their
                        days to give{" "}
                        <strong className="font-semibold text-neutral-900">
                            praise to the Lord
                        </strong>{" "}
                        for continuing to bless their lives day in and day out.
                    </p>

                    <div className="mt-9 flex max-w-xl flex-col gap-3">
                        {welcomeActions.map((action) => {
                            const Icon = action.icon;

                            return (
                                <Link
                                    key={action.label}
                                    to={action.to}
                                    className={[
                                        `
                                            group flex min-h-16 w-full
                                            items-center gap-4
                                            rounded-2xl border px-4
                                            text-left text-sm font-semibold
                                            tracking-wide
                                            transition duration-200
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-primary-900
                                            focus-visible:ring-offset-2
                                            sm:px-5 sm:text-base
                                        `,
                                        action.primary
                                            ? `
                                                border-primary-900
                                                bg-primary-900 text-white
                                                shadow-lg shadow-primary-900/15
                                                hover:-translate-y-0.5
                                                hover:bg-primary-800
                                                hover:shadow-xl
                                                hover:shadow-primary-900/20
                                            `
                                            : `
                                                border-neutral-900
                                                bg-neutral-900 text-white
                                                shadow-lg shadow-black/10
                                                hover:-translate-y-0.5
                                                hover:border-primary-900
                                                hover:bg-primary-900
                                                hover:shadow-xl
                                                hover:shadow-primary-900/15
                                            `,
                                    ].join(" ")}
                                >
                                    <span
                                        className="
                                            grid size-10 shrink-0
                                            place-items-center rounded-xl
                                            bg-white/10 text-xl
                                            transition-transform duration-200
                                            group-hover:scale-105
                                        "
                                    >
                                        <Icon aria-hidden="true" />
                                    </span>

                                    <span className="flex-1">
                                        {action.label}
                                    </span>

                                    <FiArrowUpRight
                                        aria-hidden="true"
                                        className="
                                            text-lg opacity-60
                                            transition duration-200
                                            group-hover:-translate-y-0.5
                                            group-hover:translate-x-0.5
                                            group-hover:opacity-100
                                        "
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Featured image */}
                <div
                    className="
                        relative
                        aspect-[4/3] w-full
                        overflow-hidden rounded-3xl
                        border border-neutral-200
                        bg-neutral-200
                        shadow-2xl shadow-neutral-900/15
                        lg:aspect-auto lg:min-h-[34rem]
                    "
                >
                    <img
                        src={unavailableImg}
                        alt="Church congregation gathered for worship"
                        className="
                            absolute inset-0
                            h-full w-full object-cover object-center
                            transition-transform duration-700
                            hover:scale-[1.02]
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-neutral-900/30
                            via-transparent
                            to-transparent
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            absolute inset-x-6 bottom-6
                            h-px bg-white/30
                        "
                    />
                </div>
            </div>
        </section>
    );
}
