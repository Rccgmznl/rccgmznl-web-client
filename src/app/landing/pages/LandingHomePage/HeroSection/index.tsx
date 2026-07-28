import { Link } from "react-router";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

import unavailableImg from "@shared/images/unavailable.png";
import HeroSectionHeader from "./HeroSectionHeader";

const socialLinks = [
    {
        label: "YouTube",
        href: "#",
        icon: FaYoutube,
    },
    {
        label: "X",
        href: "#",
        icon: FaXTwitter,
    },
    {
        label: "Facebook",
        href: "#",
        icon: FaFacebookF,
    },
    {
        label: "Instagram",
        href: "#",
        icon: FaInstagram,
    },
];

export default function HeroSection() {
    return (
        <section className="relative isolate min-h-[46rem] overflow-hidden bg-neutral-900 text-white lg:min-h-[100svh]">
            {/* Background */}
            <img
                src={unavailableImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
            />

            {/* Image overlays */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-20 bg-black/55"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/40 to-black/65"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/35"
            />

            {/* Header */}
            <HeroSectionHeader />

            {/* Hero content */}
            <div className="relative z-20 mx-auto flex min-h-[calc(46rem-5rem)] w-full max-w-[90rem] flex-col px-5 pb-6 pt-10 sm:px-8 sm:pb-8 lg:min-h-[calc(100svh-6rem)] lg:px-12 lg:py-16">
                <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-16">
                    {/* Main message */}
                    <div className="max-w-4xl">
                        <div className="mb-8 flex items-center gap-3">
                            <span className="h-px w-10 bg-primary-900" />

                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                                <span className="text-primary-900">01</span>
                                <span className="mx-1 text-white/35">/</span>
                                10
                            </p>
                        </div>

                        <h1 className="font-sans text-[clamp(3.4rem,9vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.055em]">
                            <span className="block text-white">
                                Welcome
                            </span>

                            <span className="mt-2 block text-primary-900">
                                Home!
                            </span>
                        </h1>

                        <Link
                            to="/visit"
                            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:border-primary-900 hover:bg-primary-900 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                        >
                            Worship with us
                            <FiChevronRight
                                aria-hidden="true"
                                className="ml-2 text-lg"
                            />
                        </Link>
                    </div>

                    {/* Bible verse */}
                    <article className="max-w-xl justify-self-end rounded-3xl border border-white/10 bg-black/25 p-6 text-right shadow-2xl shadow-black/20 backdrop-blur-md sm:p-8 lg:self-start lg:mt-12">
                        <p className="text-sm font-bold text-primary-900 sm:text-base">
                            Psalm 100:4
                        </p>

                        <blockquote className="mt-4 font-serif text-xl leading-relaxed text-white/90 sm:text-2xl">
                            <span
                                aria-hidden="true"
                                className="mr-1 text-3xl leading-none text-primary-900"
                            >
                                “
                            </span>

                            Enter his gates with thanksgiving, and his
                            courts with{" "}
                            <strong className="font-semibold text-primary-900">
                                praise
                            </strong>

                            <span
                                aria-hidden="true"
                                className="ml-1 text-3xl leading-none text-primary-900"
                            >
                                ”
                            </span>
                        </blockquote>
                    </article>
                </div>

                {/* Bottom controls */}
                <footer className="mt-12 flex items-end justify-between border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;

                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="grid size-10 place-items-center rounded-full border border-white/10 bg-black/20 text-white/70 backdrop-blur-sm transition hover:border-primary-900 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900"
                                >
                                    <Icon
                                        aria-hidden="true"
                                        className="text-lg"
                                    />
                                </a>
                            );
                        })}
                    </div>

                    <div
                        aria-label="Hero slide controls"
                        className="flex items-center gap-2"
                    >
                        <button
                            type="button"
                            aria-label="Show previous background"
                            className="grid size-12 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition hover:border-primary-900 hover:bg-primary-900 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900"
                        >
                            <FiChevronLeft
                                aria-hidden="true"
                                className="text-2xl"
                            />
                        </button>

                        <button
                            type="button"
                            aria-label="Show next background"
                            className="grid size-12 place-items-center rounded-full border border-primary-900 bg-primary-900 text-neutral-900 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900"
                        >
                            <FiChevronRight
                                aria-hidden="true"
                                className="text-2xl"
                            />
                        </button>
                    </div>
                </footer>
            </div>
        </section>
    );
}
