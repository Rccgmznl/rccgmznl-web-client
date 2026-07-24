import { Link } from "react-router";
import {
    FiArrowUpRight,
    FiCompass,
    FiTarget,
} from "react-icons/fi";

import unavailableImg from "@shared/images/unavailable.png";

const churchPurpose = [
    {
        title: "The Mission",
        icon: FiTarget,
        content:
            "The mission of the Redeemed Christian Church of God is to make heaven, take as many people with us, and have a member of RCCG in every family of all nations.",
    },
    {
        title: "The Vision",
        icon: FiCompass,
        content:
            "We pursue these objectives until every nation in the world is reached for Jesus Christ, with a focus on holiness, discipleship, and church planting.",
    },
];

export default function LeadersSection() {
    return (
        <section
            aria-labelledby="leaders-heading"
            className="overflow-hidden bg-neutral-100 text-neutral-900"
        >
            <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <header className="mb-9 sm:mb-12">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-900">
                        Our spiritual leadership
                    </p>

                    <h2
                        id="leaders-heading"
                        className="
                            text-3xl font-black uppercase
                            leading-none tracking-[-0.035em]
                            sm:text-4xl lg:text-5xl
                        "
                    >
                        Meet our{" "}
                        <span className="text-primary-900">
                            leaders
                        </span>
                    </h2>
                </header>

                <div
                    className="
                        grid items-stretch gap-8
                        lg:grid-cols-[minmax(22rem,0.9fr)_minmax(0,1.1fr)]
                        lg:gap-12
                    "
                >
                    {/* Leader image */}
                    <article
                        className="
                            group overflow-hidden rounded-[2rem]
                            border border-neutral-200 bg-white
                            shadow-xl shadow-neutral-900/10
                        "
                    >
                        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:h-full lg:min-h-[37rem] lg:aspect-auto">
                            <img
                                src={unavailableImg}
                                alt="Pastor Akin and Pastor Olu Familusi"
                                className="
                                    h-full w-full object-cover object-center
                                    transition-transform duration-700
                                    group-hover:scale-[1.025]
                                "
                            />

                            <div
                                aria-hidden="true"
                                className="
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-neutral-900/85
                                    via-transparent
                                    to-transparent
                                "
                            />

                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-300">
                                    Senior pastors
                                </p>

                                <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
                                    Pastor Akin &amp;
                                    <span className="block text-primary-900">
                                        Pastor Olu Familusi
                                    </span>
                                </h3>

                                <Link
                                    to="/the-church/leadership"
                                    className="
                                        group/link mt-5 inline-flex
                                        min-h-11 items-center gap-2
                                        rounded-full border border-white/25
                                        bg-white/10 px-5
                                        text-sm font-bold text-white
                                        backdrop-blur-md transition
                                        hover:border-primary-900
                                        hover:bg-primary-900
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-primary-300
                                    "
                                >
                                    Meet our pastors

                                    <FiArrowUpRight
                                        aria-hidden="true"
                                        className="
                                            text-lg transition-transform
                                            group-hover/link:-translate-y-0.5
                                            group-hover/link:translate-x-0.5
                                        "
                                    />
                                </Link>
                            </div>
                        </div>
                    </article>

                    {/* Mission and vision */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8 max-w-2xl">
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-900">
                                Guided by purpose
                            </p>

                            <h3
                                className="
                                    mt-3 font-serif text-3xl
                                    font-semibold leading-tight
                                    tracking-[-0.03em]
                                    sm:text-4xl lg:text-5xl
                                "
                            >
                                Leading with faith, love and a clear vision.
                            </h3>

                            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                                Our leaders are committed to serving God,
                                strengthening families and helping every person
                                grow in faith and purpose.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            {churchPurpose.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <article
                                        key={item.title}
                                        className="
                                            group rounded-[1.5rem]
                                            border border-neutral-200
                                            bg-white p-6
                                            shadow-sm transition duration-200
                                            hover:-translate-y-0.5
                                            hover:border-primary-900/40
                                            hover:shadow-lg
                                            sm:p-7
                                            lg:grid
                                            lg:grid-cols-[auto_minmax(0,1fr)]
                                            lg:gap-5
                                        "
                                    >
                                        <div
                                            className="
                                                grid size-12 shrink-0
                                                place-items-center rounded-2xl
                                                bg-primary-100
                                                text-xl text-primary-900
                                                transition
                                                group-hover:bg-primary-900
                                                group-hover:text-white
                                            "
                                        >
                                            <Icon aria-hidden="true" />
                                        </div>

                                        <div className="mt-5 lg:mt-0">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-black text-neutral-300">
                                                    0{index + 1}
                                                </span>

                                                <h4
                                                    className="
                                                        text-2xl font-black
                                                        uppercase tracking-[-0.025em]
                                                        sm:text-3xl
                                                    "
                                                >
                                                    {item.title ===
                                                        "The Mission" ? (
                                                        <>
                                                            The{" "}
                                                            <span className="text-primary-900">
                                                                Mission
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            The{" "}
                                                            <span className="text-primary-900">
                                                                Vision
                                                            </span>
                                                        </>
                                                    )}
                                                </h4>
                                            </div>

                                            <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                                                {item.content}
                                            </p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <Link
                            to="/the-church"
                            className="
                                group mt-7 inline-flex min-h-12
                                w-full items-center justify-center
                                gap-2 rounded-full
                                border-2 border-neutral-900
                                px-6 text-sm font-bold
                                text-neutral-900 transition
                                hover:border-primary-900
                                hover:bg-primary-900
                                hover:text-white
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary-900
                                focus-visible:ring-offset-2
                                sm:w-fit
                            "
                        >
                            Learn more about our church

                            <FiArrowUpRight
                                aria-hidden="true"
                                className="
                                    text-lg transition-transform
                                    group-hover:-translate-y-0.5
                                    group-hover:translate-x-0.5
                                "
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
