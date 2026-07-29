import type { ReactNode } from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

import { useLandingContext } from '@app/landing/providers/landing.ctx';
import EditModeBtn from '@shared/EditModeBtn';
import { useFeaturedBibleVerse } from '@features/featuredBibleVerse';
import { ENV } from '@config/env';

import './index.css';
import EditModeBibleVerse from './EditModeBibleVerse';

const bibleVerseCardClassName = `
    relative min-h-56 w-full max-w-xl
    justify-self-end
    rounded-3xl border border-white/10
    bg-black/25 p-6 text-right
    shadow-2xl shadow-black/20
    backdrop-blur-md
    sm:p-8
    lg:mt-12 lg:self-start
`;

const MAX_VERSE_LENGTH = 300;

function truncateText(text: string, maxLength = MAX_VERSE_LENGTH): string {
    const normalizedText = text.trim();

    if (maxLength <= 0 || normalizedText.length <= maxLength) {
        return normalizedText;
    }

    const truncatedText = normalizedText.slice(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');

    /*
     * Prefer ending at a complete word. If no space exists, such as
     * with one very long word, use the exact character limit.
     */
    const cutoffIndex = lastSpaceIndex > 0 ? lastSpaceIndex : maxLength;

    return `${truncatedText.slice(0, cutoffIndex).trimEnd()}…`;
}

export default function HeroSectionBibleVerse() {
    const { landingSession } = useLandingContext();
    const { isEditMode } = landingSession;

    /*
     * Keep the complete query object intact so TypeScript can narrow
     * `data` and `error` based on the discriminated `status` value.
     */
    const bibleVerseQuery = useFeaturedBibleVerse();

    let cardContent: ReactNode;

    if (bibleVerseQuery.status === 'pending') {
        cardContent = (
            <>
                <div
                    aria-hidden="true"
                    className="
                        skeleton-shimmer ml-auto
                        h-5 w-28 rounded-full
                        bg-white/15
                    "
                />

                <div aria-hidden="true" className="mt-5 space-y-3">
                    <div className="skeleton-shimmer ml-auto h-6 w-full rounded-full bg-white/10" />
                    <div className="skeleton-shimmer ml-auto h-6 w-full rounded-full bg-white/10" />
                    <div className="skeleton-shimmer ml-auto h-6 w-[94%] rounded-full bg-white/10" />
                    <div className="skeleton-shimmer ml-auto h-6 w-[62%] rounded-full bg-white/10" />
                </div>

                <span className="sr-only">Loading featured Bible verse...</span>
            </>
        );
    } else if (bibleVerseQuery.status === 'error') {
        cardContent = (
            <div className="ml-auto flex max-w-sm flex-col items-end">
                <span
                    aria-hidden="true"
                    className="
                        grid size-11 place-items-center
                        rounded-full
                        border border-accent-400/20
                        bg-accent-900/10
                        text-xl text-accent-400
                    "
                >
                    <FiAlertCircle />
                </span>

                <h3 className="mt-4 text-base font-bold text-white sm:text-lg">
                    We couldn&apos;t load the featured verse
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/60">
                    Please try again. The rest of the page is still available.
                </p>

                <button
                    type="button"
                    disabled={bibleVerseQuery.isFetching}
                    aria-busy={bibleVerseQuery.isFetching}
                    onClick={() => {
                        /*
                         * React Query manages the retry result and updates the
                         * query state, so the returned promise is intentionally
                         * not awaited by the click handler.
                         */
                        void bibleVerseQuery.refetch();
                    }}
                    className="
                        group mt-5 inline-flex min-h-10
                        items-center justify-center gap-2
                        rounded-full border border-white/15
                        bg-white/[0.06] px-4
                        text-sm font-semibold text-white
                        transition
                        hover:border-primary-900
                        hover:bg-primary-900
                        disabled:cursor-wait
                        disabled:opacity-60
                        disabled:hover:border-white/15
                        disabled:hover:bg-white/[0.06]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-900
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-neutral-900
                    "
                >
                    <FiRefreshCw
                        aria-hidden="true"
                        className={
                            bibleVerseQuery.isFetching
                                ? 'animate-spin'
                                : `
                                    transition-transform
                                    duration-300
                                    group-hover:rotate-180
                                `
                        }
                    />

                    {bibleVerseQuery.isFetching
                        ? 'Trying again...'
                        : 'Try again'}
                </button>

                {ENV.DEBUG && (
                    <details className="mt-4 max-w-full text-xs text-white/40">
                        <summary className="cursor-pointer text-right">
                            Debug details
                        </summary>

                        <p className="mt-2 break-words rounded-xl bg-black/20 p-3 text-left">
                            {bibleVerseQuery.error.message}
                        </p>
                    </details>
                )}
            </div>
        );
    } else {
        /*
         * Reaching this branch means the query status is "success",
         * so data is guaranteed to be FeaturedBibleVerse.
         */
        const verseText = truncateText(bibleVerseQuery.data.text);

        cardContent = (
            <>
                <p className="text-sm font-bold text-primary-900 sm:text-base">
                    {bibleVerseQuery.data.reference}
                </p>

                <blockquote className="mt-4 font-serif text-xl leading-relaxed text-white/90 sm:text-2xl">
                    <span
                        aria-hidden="true"
                        className="mr-1 text-3xl leading-none text-primary-900"
                    >
                        “
                    </span>

                    {verseText}

                    <span
                        aria-hidden="true"
                        className="ml-1 text-3xl leading-none text-primary-900"
                    >
                        ”
                    </span>
                </blockquote>
            </>
        );
    }

    const isPending = bibleVerseQuery.status === 'pending';

    const isError = bibleVerseQuery.status === 'error';

    return (
        <article
            role={isPending ? 'status' : isError ? 'alert' : undefined}
            aria-label={isPending ? 'Loading featured Bible verse' : undefined}
            aria-busy={isPending || bibleVerseQuery.isFetching}
            className={`
                ${bibleVerseCardClassName}
                ${isError ? 'flex flex-col justify-center' : ''}
            `}
        >
            {isEditMode && bibleVerseQuery.isSuccess && (
                <EditModeBtn
                    content={
                        <EditModeBibleVerse bibleVerse={bibleVerseQuery.data} />
                    }
                    label="Edit Bible verse"
                />
            )}

            {cardContent}
        </article>
    );
}
