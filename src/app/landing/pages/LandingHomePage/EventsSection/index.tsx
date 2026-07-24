import { NavLink } from "react-router";
import {
    FiArrowRight,
    FiCalendar,
    FiClock,
} from "react-icons/fi";

import unavailableImg from "@shared/images/unavailable.png";

const events = [
    {
        id: 1,
        month: "Dec",
        day: "28",
        year: "2025",
        dateTime: "2025-12-28T11:00:00",
        dateLabel: "Dec 28",
        time: "11:00 AM – 3:00 PM",
        title: "The Compass of a Caring Heart",
        description:
            "Good morning, beloved community. It’s a joy to see each of your faces here today. Whether in person or in spirit, we often think of our lives as journeys, full of twists, turns and unexpected detours.",
        image: unavailableImg,
    },
    {
        id: 2,
        month: "Jan",
        day: "04",
        year: "2026",
        dateTime: "2026-01-04T10:00:00",
        dateLabel: "Jan 04",
        time: "10:00 AM – 1:00 PM",
        title: "Walking Together in Faith",
        description:
            "Join us for a meaningful gathering centered on fellowship, worship and growing together in faith. Everyone is welcome to attend and share in this special moment.",
        image: unavailableImg,
    },
    {
        id: 3,
        month: "Jan",
        day: "11",
        year: "2026",
        dateTime: "2026-01-11T11:00:00",
        dateLabel: "Jan 11",
        time: "11:00 AM – 3:00 PM",
        title: "A New Season of Grace",
        description:
            "Come and celebrate a new season filled with hope, prayer and renewed purpose. We will worship, connect and encourage one another as a church family.",
        image: unavailableImg,
    },
];

export default function EventsSection() {
    return (
        <section
            id="events"
            aria-labelledby="events-heading"
            className="bg-white text-neutral-900"
        >
            <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <header className="mb-10 flex items-end justify-between gap-6 border-b border-neutral-300 pb-5">
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-primary-900">
                            What’s happening
                        </p>

                        <h2
                            id="events-heading"
                            className="font-sans text-3xl font-black uppercase tracking-[-0.03em] sm:text-4xl"
                        >
                            Upcoming Events
                        </h2>
                    </div>

                    <NavLink
                        to="/events"
                        className="group hidden items-center gap-2 text-sm font-semibold text-neutral-700 transition hover:text-primary-900 sm:flex"
                    >
                        View all events

                        <FiArrowRight
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </NavLink>
                </header>

                <ul className="divide-y divide-neutral-200">
                    {events.map((event, index) => (
                        <li key={event.id}>
                            <article
                                className="
                                    group grid grid-cols-[3.25rem_minmax(0,1fr)]
                                    gap-x-4 gap-y-4 py-7
                                    sm:grid-cols-[4rem_minmax(0,1fr)]
                                    sm:gap-x-6
                                    lg:grid-cols-[4.5rem_minmax(0,1fr)_20rem]
                                    lg:items-center lg:gap-10 lg:py-8
                                "
                            >
                                {/* Date */}
                                <time
                                    dateTime={event.dateTime}
                                    className="
                                        row-span-2 flex flex-col items-center
                                        border-r border-neutral-200 pr-4
                                        text-center sm:pr-6
                                        lg:row-span-1 lg:self-stretch
                                        lg:justify-center
                                    "
                                >
                                    {index === 0 && (
                                        <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-neutral-900 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-white">
                                            <FiCalendar aria-hidden="true" />
                                            Today
                                        </span>
                                    )}

                                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-neutral-600">
                                        {event.month}
                                    </span>

                                    <span className="text-3xl font-black leading-none text-neutral-900">
                                        {event.day}
                                    </span>

                                    <span className="mt-1 text-[0.65rem] font-semibold text-neutral-500">
                                        {event.year}
                                    </span>
                                </time>

                                {/* Mobile/tablet image */}
                                <NavLink
                                    to={`/events/${event.id}`}
                                    aria-label={`View ${event.title}`}
                                    className="
                                        relative col-start-2
                                        aspect-[16/10] overflow-hidden
                                        rounded-2xl bg-neutral-200
                                        lg:hidden
                                    "
                                >
                                    <img
                                        src={event.image}
                                        alt=""
                                        className="
                                            h-full w-full object-cover
                                            transition-transform duration-500
                                            group-hover:scale-105
                                        "
                                    />

                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                                    />
                                </NavLink>

                                {/* Event details */}
                                <div className="col-start-2 min-w-0 lg:col-auto">
                                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-wide text-neutral-500 sm:text-xs">
                                        <span>{event.dateLabel}</span>

                                        <span
                                            aria-hidden="true"
                                            className="size-1 rounded-full bg-primary-900"
                                        />

                                        <span className="inline-flex items-center gap-1.5">
                                            <FiClock aria-hidden="true" />
                                            {event.time}
                                        </span>
                                    </div>

                                    <h3 className="font-sans text-lg font-black leading-tight tracking-[-0.02em] sm:text-xl lg:text-2xl">
                                        <NavLink
                                            to={`/events/${event.id}`}
                                            className="transition-colors hover:text-primary-900"
                                        >
                                            {event.title}
                                        </NavLink>
                                    </h3>

                                    <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                                        {event.description}
                                    </p>

                                    <NavLink
                                        to={`/events/${event.id}`}
                                        className="
                                            mt-4 inline-flex items-center gap-2
                                            text-sm font-bold text-primary-900
                                            transition hover:text-primary-800
                                        "
                                    >
                                        Event details

                                        <FiArrowRight
                                            aria-hidden="true"
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </NavLink>
                                </div>

                                {/* Desktop image */}
                                <NavLink
                                    to={`/events/${event.id}`}
                                    aria-label={`View ${event.title}`}
                                    className="
                                        relative hidden aspect-[16/10]
                                        overflow-hidden rounded-2xl
                                        bg-neutral-200 lg:block
                                    "
                                >
                                    <img
                                        src={event.image}
                                        alt=""
                                        className="
                                            h-full w-full object-cover
                                            transition-transform duration-500
                                            group-hover:scale-105
                                        "
                                    />

                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                                    />
                                </NavLink>
                            </article>
                        </li>
                    ))}
                </ul>

                <footer
                    className="
                        mt-10 flex flex-col gap-5
                        rounded-3xl bg-neutral-900
                        px-6 py-7 text-white
                        sm:flex-row sm:items-center
                        sm:justify-between sm:px-8
                    "
                >
                    <h3 className="max-w-3xl text-2xl font-black uppercase leading-tight tracking-[-0.02em] sm:text-3xl">
                        Join{" "}
                        <span className="text-primary-900">
                            us
                        </span>{" "}
                        for a new month of wonders
                    </h3>

                    <NavLink
                        to="/events"
                        className="
                            inline-flex min-h-12 shrink-0
                            items-center justify-center gap-2
                            rounded-xl bg-primary-900
                            px-6 text-sm font-bold
                            text-white transition
                            hover:bg-primary-800
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary-300
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-neutral-900
                        "
                    >
                        All events
                        <FiArrowRight aria-hidden="true" />
                    </NavLink>
                </footer>
            </div>
        </section>
    );
}
