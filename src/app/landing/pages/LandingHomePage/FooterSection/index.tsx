import { Link } from 'react-router';
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
} from 'react-icons/fa6';

import unavailableImg from '@shared/images/unavailable.png';

const footerLinks = [
    {
        title: 'Our Church',
        links: [
            { label: 'About Us', to: '/the-church' },
            { label: 'Our Leadership', to: '/the-church/leadership' },
            { label: 'Visit', to: '/visit' },
            { label: "I'm New", to: '/im-new' },
        ],
    },
    {
        title: 'Departments',
        links: [
            { label: 'Housekeepers of God', to: '/departments/housekeepers' },
            { label: 'The Doorkeepers', to: '/departments/doorkeepers' },
            { label: 'The Keepers Ministry', to: '/departments/keepers' },
            { label: 'Technical Unit', to: '/departments/technical' },
            { label: "Children's Department", to: '/departments/children' },
            { label: 'Men of Valor', to: '/departments/men-of-valor' },
            { label: 'Young Adults', to: '/departments/young-adults' },
        ],
    },
    {
        title: 'More',
        links: [
            { label: 'Teachings', to: '/sermons' },
            { label: 'Make a Prayer Request', to: '/prayer-request' },
            { label: 'Testimonies', to: '/testimonies' },
            { label: 'Request a Ride', to: '/request-a-ride' },
        ],
    },
];

const socialLinks = [
    {
        label: 'YouTube',
        href: '#',
        icon: FaYoutube,
    },
    {
        label: 'X',
        href: '#',
        icon: FaXTwitter,
    },
    {
        label: 'Facebook',
        href: '#',
        icon: FaFacebookF,
    },
    {
        label: 'Instagram',
        href: '#',
        icon: FaInstagram,
    },
];

export default function FooterSection() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-neutral-900 text-white">
            <div className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_1.5fr_0.8fr] lg:gap-14">
                    {/* Church information */}
                    <div>
                        <Link
                            to="/"
                            aria-label="Mount Zion Church home"
                            className="inline-flex items-center gap-4"
                        >
                            <img
                                src={unavailableImg}
                                alt="Mount Zion Church"
                                className="size-16 rounded-2xl object-cover"
                            />

                            <div>
                                <p className="text-xl font-black uppercase tracking-[-0.025em] text-primary-900">
                                    Mount Zion
                                </p>

                                <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/45">
                                    St. John&apos;s, NL
                                </p>
                            </div>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
                            A welcoming church community committed to growing in
                            faith, serving others and sharing the love of
                            Christ.
                        </p>

                        <address className="mt-7 space-y-4 not-italic">
                            <a
                                href="tel:+17097702501"
                                className="group flex w-fit items-center gap-3 text-sm text-white/70 transition hover:text-primary-900"
                            >
                                <FiPhone
                                    aria-hidden="true"
                                    className="text-lg text-primary-900"
                                />
                                (709) 770-2501
                            </a>

                            <a
                                href="mailto:info@rccgmountzionnl.org"
                                className="group flex w-fit items-center gap-3 text-sm text-white/70 transition hover:text-primary-900"
                            >
                                <FiMail
                                    aria-hidden="true"
                                    className="text-lg text-primary-900"
                                />
                                info@rccgmountzionnl.org
                            </a>

                            <div className="flex items-start gap-3 text-sm leading-6 text-white/70">
                                <FiMapPin
                                    aria-hidden="true"
                                    className="mt-1 shrink-0 text-lg text-primary-900"
                                />

                                <span>Add the full church address here</span>
                            </div>
                        </address>
                    </div>

                    {/* Navigation groups */}
                    {footerLinks.map((group) => (
                        <nav
                            key={group.title}
                            aria-label={`${group.title} footer navigation`}
                        >
                            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                                {group.title}
                            </h2>

                            <ul
                                className={[
                                    'mt-6 grid gap-x-5 gap-y-4',
                                    group.title === 'Departments'
                                        ? 'sm:grid-cols-2 lg:grid-cols-2'
                                        : '',
                                ].join(' ')}
                            >
                                {group.links.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="
                                                group inline-flex items-center
                                                gap-1.5 text-sm leading-5
                                                text-white/55 transition
                                                hover:text-primary-900
                                            "
                                        >
                                            {link.label}

                                            <FiArrowUpRight
                                                aria-hidden="true"
                                                className="
                                                    text-xs opacity-0
                                                    transition duration-200
                                                    group-hover:-translate-y-0.5
                                                    group-hover:translate-x-0.5
                                                    group-hover:opacity-100
                                                "
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                {/* Lower footer */}
                <div className="mt-14 flex flex-col gap-7 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-white/45">
                        © {currentYear} Mount Zion Church. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;

                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="
                                        grid size-10 place-items-center
                                        rounded-full border border-white/10
                                        text-white/65 transition
                                        hover:border-primary-900
                                        hover:bg-primary-900
                                        hover:text-white
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-primary-300
                                    "
                                >
                                    <Icon
                                        aria-hidden="true"
                                        className="text-lg"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
