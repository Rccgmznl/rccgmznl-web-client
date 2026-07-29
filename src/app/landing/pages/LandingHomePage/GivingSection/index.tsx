import { Link } from 'react-router';
import { FiArrowRight, FiHeart } from 'react-icons/fi';

export default function GivingSection() {
    return (
        <section
            aria-labelledby="giving-heading"
            className="w-full bg-neutral-900 text-white"
        >
            <div
                className="
                    relative mx-auto w-full max-w-[90rem]
                    overflow-hidden
                    px-5 py-12
                    sm:px-8 sm:py-14
                    lg:px-12 lg:py-16
                "
            >
                {/* Decorative background */}
                <div
                    aria-hidden="true"
                    className="
                        absolute -right-20 -top-28
                        size-72 rounded-full
                        bg-primary-900/10 blur-3xl
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute -bottom-32 left-1/3
                        size-64 rounded-full
                        bg-white/[0.04] blur-3xl
                    "
                />

                <div
                    className="
                        relative flex flex-col gap-8
                        lg:flex-row lg:items-center
                        lg:justify-between lg:gap-16
                    "
                >
                    <div className="max-w-3xl">
                        <div className="mb-4 flex items-center gap-3">
                            <span
                                className="
                                    grid size-10 shrink-0
                                    place-items-center rounded-full
                                    bg-primary-900/15
                                    text-lg text-primary-900
                                "
                            >
                                <FiHeart aria-hidden="true" />
                            </span>

                            <p
                                className="
                                    text-xs font-bold uppercase
                                    tracking-[0.2em] text-primary-900
                                "
                            >
                                Give with purpose
                            </p>
                        </div>

                        <h2
                            id="giving-heading"
                            className="
                                text-3xl font-black
                                leading-tight tracking-[-0.035em]
                                sm:text-4xl
                            "
                        >
                            Your generosity helps us{' '}
                            <span className="text-primary-900">
                                serve and reach others.
                            </span>
                        </h2>

                        <p
                            className="
                                mt-4 max-w-2xl
                                text-sm leading-6 text-white/65
                                sm:text-base sm:leading-7
                            "
                        >
                            Every gift supports the work of the church,
                            community outreach and the mission of sharing the
                            love of Christ.
                        </p>
                    </div>

                    <Link
                        to="/giving"
                        className="
                            group inline-flex min-h-12
                            w-full shrink-0 items-center
                            justify-center gap-2 rounded-full
                            bg-primary-900 px-7
                            text-sm font-bold text-white
                            transition duration-200
                            hover:-translate-y-0.5
                            hover:bg-primary-800
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary-300
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-neutral-900
                            sm:w-fit
                        "
                    >
                        Give now
                        <FiArrowRight
                            aria-hidden="true"
                            className="
                                text-lg transition-transform
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
