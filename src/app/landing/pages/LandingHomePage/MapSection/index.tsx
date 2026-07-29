import { FiArrowUpRight, FiClock, FiMapPin } from 'react-icons/fi';

const churchAddress = '108 Blackmash road';

const encodedAddress = encodeURIComponent(churchAddress);

export default function MapSection() {
    return (
        <section
            aria-labelledby="location-heading"
            className="bg-white text-neutral-900"
        >
            <div
                className="
                    mx-auto w-full max-w-[90rem]
                    px-5 py-16
                    sm:px-8 sm:py-20
                    lg:px-12 lg:py-24
                "
            >
                <header className="mb-8 max-w-2xl">
                    <p
                        className="
                            mb-3 text-xs font-bold uppercase
                            tracking-[0.22em] text-primary-900
                        "
                    >
                        Visit us
                    </p>

                    <h2
                        id="location-heading"
                        className="
                            text-3xl font-black
                            uppercase leading-none
                            tracking-[-0.035em]
                            sm:text-4xl lg:text-5xl
                        "
                    >
                        Our <span className="text-primary-900">location</span>
                    </h2>

                    <p
                        className="
                            mt-4 text-sm leading-6
                            text-neutral-600
                            sm:text-base sm:leading-7
                        "
                    >
                        We would love to welcome you in person. Use the map
                        below to find the church and plan your visit.
                    </p>
                </header>

                <div
                    className="
                        overflow-hidden rounded-[2rem]
                        border border-neutral-200
                        bg-neutral-100
                        shadow-xl shadow-neutral-900/10
                        lg:grid
                        lg:grid-cols-[20rem_minmax(0,1fr)]
                    "
                >
                    {/* Location details */}
                    <div
                        className="
                            flex flex-col justify-between
                            bg-neutral-900 p-6 text-white
                            sm:p-8 lg:p-10
                        "
                    >
                        <div>
                            <span
                                className="
                                    grid size-12 place-items-center
                                    rounded-2xl
                                    bg-primary-900/15
                                    text-xl text-primary-900
                                "
                            >
                                <FiMapPin aria-hidden="true" />
                            </span>

                            <h3
                                className="
                                    mt-6 text-2xl font-black
                                    tracking-[-0.025em]
                                "
                            >
                                Mount Zion Church
                            </h3>

                            <address
                                className="
                                    mt-3 not-italic
                                    text-sm leading-6 text-white/65
                                "
                            >
                                {churchAddress}
                            </address>

                            <div
                                className="
                                    mt-6 flex items-start gap-3
                                    border-t border-white/10 pt-6
                                "
                            >
                                <FiClock
                                    aria-hidden="true"
                                    className="
                                        mt-1 shrink-0
                                        text-primary-900
                                    "
                                />

                                <div>
                                    <p className="text-sm font-bold">
                                        Sunday service
                                    </p>

                                    <p className="mt-1 text-sm text-white/60">
                                        First Service: 9am - 11am
                                    </p>
                                    <p className="mt-1 text-sm text-white/60">
                                        Second Service: 11:15am - 1pm
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                group mt-8 inline-flex min-h-12
                                items-center justify-center gap-2
                                rounded-full bg-primary-900
                                px-6 text-sm font-bold text-white
                                transition duration-200
                                hover:-translate-y-0.5
                                hover:bg-primary-800
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary-300
                            "
                        >
                            Get directions
                            <FiArrowUpRight
                                aria-hidden="true"
                                className="
                                    text-lg transition-transform
                                    group-hover:-translate-y-0.5
                                    group-hover:translate-x-0.5
                                "
                            />
                        </a>
                    </div>

                    {/* Embedded map */}
                    <div className="relative min-h-[24rem] sm:min-h-[30rem] lg:min-h-[34rem]">
                        <iframe
                            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                            title={`Map showing the location of Mount Zion Church at ${churchAddress}`}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            className="
                                absolute inset-0
                                h-full w-full border-0
                            "
                        />

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none absolute inset-0
                                ring-1 ring-inset ring-black/5
                            "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
