import { NavLink } from "react-router";
import {
    FiArrowRight,
    FiCalendar,
    FiPlay,
    FiUser,
} from "react-icons/fi";

import unavailableImg from "@shared/images/unavailable.png";

const latestSermon = {
    title: "Why We Need Faith",
    speaker: "Pastor Akin Familusi",
    date: "July 11, 2026",
    dateTime: "2026-07-11",
    description:
        "A timely message about trusting God through uncertainty and continuing to walk confidently in His promises.",
    image: unavailableImg,
    sermonUrl: "/sermons/why-we-need-faith",
};

export default function LatestSermonSection() {
    return (
        <section
            aria-labelledby="latest-sermon-heading"
            className="bg-white text-neutral-900"
        >
            <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <header className="mb-8 flex items-end justify-between gap-6">
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-primary-900">
                            Watch and grow
                        </p>

                        <h2
                            id="latest-sermon-heading"
                            className="text-3xl font-black uppercase tracking-[-0.035em] sm:text-4xl"
                        >
                            Latest Sermon
                        </h2>
                    </div>

                    {/* 
                        <NavLink
                            to="/sermons"
                            className="
                                group hidden items-center gap-2
                                text-sm font-semibold text-neutral-600
                                transition-colors hover:text-primary-900
                                sm:inline-flex
                            "
                        >
                            Browse sermons

                            <FiArrowRight
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </NavLink>

                    */}
                </header>

                <article
                    className="
                        group relative isolate
                        min-h-[36rem] overflow-hidden
                        rounded-[2rem] bg-neutral-900
                        shadow-2xl shadow-neutral-900/15
                        sm:min-h-[40rem]
                        lg:min-h-[35rem]
                    "
                >
                    <img
                        src={latestSermon.image}
                        alt={`Sermon thumbnail for ${latestSermon.title}`}
                        className="
                            absolute inset-0 -z-30
                            h-full w-full object-cover
                            object-center
                            transition-transform duration-700
                            group-hover:scale-[1.025]
                        "
                    />

                    {/* Dark image tint */}
                    <div
                        aria-hidden="true"
                        className="
                            absolute inset-0 -z-20
                            bg-black/35
                        "
                    />

                    {/* Responsive gradient */}
                    <div
                        aria-hidden="true"
                        className="
                            absolute inset-0 -z-10
                            bg-gradient-to-t
                            from-black
                            via-black/35
                            to-black/10
                            lg:bg-gradient-to-r
                            lg:from-black/90
                            lg:via-black/45
                            lg:to-transparent
                        "
                    />

                    <div
                        className="
                            flex min-h-[36rem] flex-col
                            justify-between p-6
                            sm:min-h-[40rem] sm:p-10
                            lg:min-h-[35rem] lg:p-14
                        "
                    >
                        {/* Top label */}
                        <div className="flex items-start justify-between gap-4">
                            <span
                                className="
                                    inline-flex items-center gap-2
                                    rounded-full border border-white/15
                                    bg-black/25 px-4 py-2
                                    text-xs font-bold uppercase
                                    tracking-[0.16em] text-white
                                    backdrop-blur-md
                                "
                            >
                                <span className="size-2 rounded-full bg-primary-900" />
                                The latest sermon
                            </span>

                            <span
                                className="
                                    hidden rounded-full border border-white/15
                                    bg-black/25 px-4 py-2
                                    text-xs font-semibold text-white/80
                                    backdrop-blur-md sm:block
                                "
                            >
                                Mount Zion Church
                            </span>
                        </div>

                        {/* Sermon details */}
                        <div className="max-w-3xl">
                            <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-wide text-white/70 sm:text-sm">
                                <time
                                    dateTime={latestSermon.dateTime}
                                    className="inline-flex items-center gap-2"
                                >
                                    <FiCalendar
                                        aria-hidden="true"
                                        className="text-primary-900"
                                    />

                                    {latestSermon.date}
                                </time>

                                <span
                                    aria-hidden="true"
                                    className="hidden size-1 rounded-full bg-white/40 sm:block"
                                />

                                <span className="inline-flex items-center gap-2">
                                    <FiUser
                                        aria-hidden="true"
                                        className="text-primary-900"
                                    />

                                    {latestSermon.speaker}
                                </span>
                            </div>

                            <h3
                                className="
                                    max-w-3xl text-4xl font-black
                                    leading-[0.95] tracking-[-0.045em]
                                    text-white
                                    sm:text-5xl
                                    lg:text-7xl
                                "
                            >
                                {latestSermon.title}
                            </h3>

                            <p
                                className="
                                    mt-5 max-w-xl text-sm
                                    leading-6 text-white/70
                                    sm:text-base sm:leading-7
                                "
                            >
                                {latestSermon.description}
                            </p>

                            <NavLink
                                to={latestSermon.sermonUrl}
                                className="
                                    group/watch mt-8 inline-flex
                                    min-h-12 items-center justify-center
                                    gap-3 rounded-full
                                    bg-primary-900 px-6
                                    text-sm font-bold text-white
                                    shadow-lg shadow-black/20
                                    transition duration-200
                                    hover:-translate-y-0.5
                                    hover:bg-primary-800
                                    hover:shadow-xl
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-primary-300
                                    focus-visible:ring-offset-2
                                    focus-visible:ring-offset-neutral-900
                                "
                            >
                                <span
                                    className="
                                        grid size-7 place-items-center
                                        rounded-full bg-white/15
                                    "
                                >
                                    <FiPlay
                                        aria-hidden="true"
                                        className="translate-x-px"
                                    />
                                </span>

                                Watch sermon

                                <FiArrowRight
                                    aria-hidden="true"
                                    className="
                                        transition-transform duration-200
                                        group-hover/watch:translate-x-1
                                    "
                                />
                            </NavLink>
                        </div>
                    </div>
                </article>

                <footer
                    className="
                        mt-5 flex flex-col gap-5
                        rounded-[1.5rem] bg-neutral-900
                        px-6 py-7 text-white
                        sm:flex-row sm:items-center
                        sm:justify-between sm:px-8
                    "
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                            Explore more messages
                        </p>

                        <h3
                            className="
                                mt-2 text-2xl font-black
                                uppercase leading-tight
                                tracking-[-0.025em]
                                sm:text-3xl
                            "
                        >
                            Don’t miss another{" "}
                            <span className="text-primary-900">
                                sermon
                            </span>
                        </h3>
                    </div>

                    <NavLink
                        to="/sermons"
                        className="
                            group inline-flex min-h-12
                            shrink-0 items-center justify-center
                            gap-2 rounded-full
                            border border-white/15
                            bg-white px-6
                            text-sm font-bold text-neutral-900
                            transition duration-200
                            hover:border-primary-900
                            hover:bg-primary-900
                            hover:text-white
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary-300
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-neutral-900
                        "
                    >
                        All sermons

                        <FiArrowRight
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </NavLink>
                </footer>
            </div>
        </section>
    );
}
