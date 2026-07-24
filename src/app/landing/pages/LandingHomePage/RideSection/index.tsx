import { Link } from "react-router";
import {
    FiArrowRight,
    FiClock,
    FiMapPin,
    FiUsers,
} from "react-icons/fi";

import unavailableImg from "@shared/images/unavailable.png";

const rideDetails = [
    {
        label: "Available for church services",
        icon: FiClock,
    },
    {
        label: "Pickup locations are arranged in advance",
        icon: FiMapPin,
    },
    {
        label: "Open to members and first-time visitors",
        icon: FiUsers,
    },
];

export default function RideSection() {
    return (
        <section
            aria-labelledby="ride-heading"
            className="bg-white text-neutral-900"
        >
            <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div
                    className="
                        overflow-hidden rounded-[2rem]
                        bg-neutral-900 text-white
                        shadow-2xl shadow-neutral-900/15
                        lg:grid
                        lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.85fr)]
                    "
                >
                    {/* Content */}
                    <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-primary-900" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-900">
                                Getting here should be easy
                            </p>
                        </div>

                        <h2
                            id="ride-heading"
                            className="
                                max-w-xl text-4xl font-black
                                uppercase leading-[0.95]
                                tracking-[-0.045em]
                                sm:text-5xl lg:text-6xl
                            "
                        >
                            Need a{" "}
                            <span className="text-primary-900">
                                ride?
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                            We would love to help you join us in person. Let us
                            know where you are coming from, and our team will
                            contact you with the available transportation
                            arrangements.
                        </p>

                        <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                            {rideDetails.map((detail) => {
                                const Icon = detail.icon;

                                return (
                                    <li
                                        key={detail.label}
                                        className="
                                            flex items-start gap-3
                                            rounded-2xl border border-white/10
                                            bg-white/[0.04] p-4
                                        "
                                    >
                                        <span
                                            className="
                                                grid size-10 shrink-0
                                                place-items-center rounded-xl
                                                bg-primary-900/15
                                                text-lg text-primary-900
                                            "
                                        >
                                            <Icon aria-hidden="true" />
                                        </span>

                                        <span className="pt-1 text-sm font-semibold leading-6 text-white/80">
                                            {detail.label}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/request-a-ride"
                                className="
                                    group inline-flex min-h-12
                                    items-center justify-center gap-2
                                    rounded-full bg-primary-900
                                    px-6 text-sm font-bold text-white
                                    transition duration-200
                                    hover:-translate-y-0.5
                                    hover:bg-primary-800
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-primary-300
                                    focus-visible:ring-offset-2
                                    focus-visible:ring-offset-neutral-900
                                "
                            >
                                Request a ride

                                <FiArrowRight
                                    aria-hidden="true"
                                    className="
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />
                            </Link>

                            <Link
                                to="/contact"
                                className="
                                    inline-flex min-h-12
                                    items-center justify-center
                                    rounded-full border border-white/20
                                    px-6 text-sm font-bold text-white
                                    transition
                                    hover:border-primary-900
                                    hover:text-primary-900
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-primary-300
                                "
                            >
                                Contact the church
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[28rem] lg:min-h-full">
                        <img
                            src={unavailableImg}
                            alt="Church transportation available for worshippers"
                            className="
                                absolute inset-0
                                h-full w-full object-cover object-center
                            "
                        />

                        <div
                            aria-hidden="true"
                            className="
                                absolute inset-0
                                bg-gradient-to-t
                                from-neutral-900/70
                                via-transparent
                                to-transparent
                                lg:bg-gradient-to-r
                                lg:from-neutral-900/60
                                lg:via-transparent
                                lg:to-transparent
                            "
                        />

                        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/30 p-4 text-white backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-300">
                                Plan ahead
                            </p>

                            <p className="mt-1 text-sm font-semibold leading-6 text-white/90">
                                Ride requests should be submitted before the
                                service day whenever possible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
