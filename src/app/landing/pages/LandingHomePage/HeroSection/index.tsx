import { Link } from 'react-router';
import { FiChevronRight } from 'react-icons/fi';
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
} from 'react-icons/fa6';

import HeroSectionHeader from './HeroSectionHeader';
import HeroSectionBibleVerse from './HeroSectionBibleVerse';
import HeroSectionImages from './HeroSectionImages';
import { useHeroImages } from './HeroSectionImages/hooks/useHeroImages';
import type { HeroImagesQuery } from './HeroSectionImages/types';
import { useLandingContext } from '@app/landing/providers/landing.ctx';
import EditModeBtn from '@shared/EditModeBtn';
import EditModeHeroImages from './HeroSectionImages/EditModeHeroImages';

const socialLinks = [
    {
        label: 'YouTube',
        href: 'https://www.youtube.com/@RCCGMountZionNL',
        icon: FaYoutube,
    },
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/RCCGMountZionNL',
        icon: FaFacebookF,
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/rccgmountzionnl',
        icon: FaInstagram,
    },
];

function HeroSectionMain({
    heroImagesQuery
}: {
    heroImagesQuery: HeroImagesQuery
}) {
    const { landingSession } = useLandingContext();
    const { isEditMode } = landingSession;

    const showEditBtn =
        isEditMode &&
        heroImagesQuery.isSuccess

    return (
        <div className="max-w-4xl relative">
            {showEditBtn && (
                <EditModeBtn
                    label='Edit Hero Images'
                    content={
                        <EditModeHeroImages
                            heroImages={heroImagesQuery.data}
                        />
                    }
                />
            )}
            <h1 className="font-sans text-[clamp(3.4rem,9vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.055em]">
                <span className="block text-white">Welcome</span>

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
    );
}

export default function HeroSection() {
    const heroImagesQuery =
        useHeroImages();

    return (
        <section className="relative isolate min-h-[46rem] overflow-hidden bg-neutral-900 text-white lg:min-h-[100svh]">
            {/* Background */}
            <HeroSectionImages
                heroImagesQuery={heroImagesQuery}
            />

            {/* Header */}
            <HeroSectionHeader />

            {/* Hero content */}
            <div className="relative z-20 mx-auto flex min-h-[calc(46rem-5rem)] w-full max-w-[90rem] flex-col px-5 pb-6 pt-10 sm:px-8 sm:pb-8 lg:min-h-[calc(100svh-6rem)] lg:px-12 lg:py-16">
                <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-16">
                    {/* Main message */}
                    <HeroSectionMain
                        heroImagesQuery={heroImagesQuery}
                    />

                    {/* Bible verse */}
                    <HeroSectionBibleVerse />
                </div>

                {/* Bottom controls */}
                <footer className="mt-12 flex items-end justify-between border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;

                            return (
                                <a
                                    target='_blank'
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
                </footer>
            </div>
        </section>
    );
}
