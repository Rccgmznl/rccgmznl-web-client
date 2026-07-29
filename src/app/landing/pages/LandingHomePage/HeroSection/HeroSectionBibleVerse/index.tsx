import { useLandingContext } from "@app/landing/providers/landing.ctx";
import { useModalContext } from "@features/modal/providers";
import EditModeBtn from "@shared/EditModeBtn";
import { useEffect, useState } from "react";
import { Form } from "react-router";

import "./index.css";
import { mockGetFeaturedBibleVerse } from "./api";
import { getApiResponseErrorMsg } from "@services/api.service";
import type { FeaturedBibleVerse } from "./types";
import { getTryCatchErrorMsg } from "@utils/getTryCatchErrorMsg";
import { ENV } from "@config/env";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

function EditModeBibleVerse() {
    const { closeModal } = useModalContext();
    const [isPending, setIsPending] = useState<boolean>(false);
    return (
        <Form>
            <input type="text" value={""} placeholder="Bible verse" />
            <textarea placeholder="content"></textarea>
            <input type="submit" value={"Edit Changes"} />
            <button onClick={closeModal}>Cancel</button>
        </Form>
    );
}

const bibleVerseCardClassName = `
    relative w-full max-w-xl justify-self-end
    rounded-3xl border border-white/10
    bg-black/25 p-6 text-right
    shadow-2xl shadow-black/20
    backdrop-blur-md
    sm:p-8
    lg:mt-12 lg:self-start
`;

type BibleVerseState =
    | { status: "fetching" }
    | {
        status: "fetched";
        data: FeaturedBibleVerse;
    }
    | {
        status: "error";
        message: string;
    };

function truncateText(text: string, maxLength = 300): string {
    const normalizedText = text.trim();

    if (normalizedText.length <= maxLength) {
        return normalizedText;
    }

    const truncatedText = normalizedText.slice(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");

    return `${truncatedText.slice(0, lastSpaceIndex)}…`;
}

function LoadingSkeleton() {
    return (
        <article
            role="status"
            aria-label="Loading Bible verse"
            className={bibleVerseCardClassName}
        >
            <div
                aria-hidden="true"
                className="
                    skeleton-shimmer ml-auto
                    h-5 w-28 rounded-full
                    bg-white/15
                "
            />

            <div
                aria-hidden="true"
                className="mt-5 space-y-3"
            >
                <div className="skeleton-shimmer ml-auto h-6 w-full rounded-full bg-white/10" />
                <div className="skeleton-shimmer ml-auto h-6 w-full rounded-full bg-white/10" />
                <div className="skeleton-shimmer ml-auto h-6 w-[94%] rounded-full bg-white/10" />
                <div className="skeleton-shimmer ml-auto h-6 w-[62%] rounded-full bg-white/10" />
            </div>

            <span className="sr-only">
                Loading Bible verse...
            </span>
        </article>
    );
}

interface ErrorStateProps {
    message: string;
    isEditMode: boolean;
    onRetry: () => void;
}

function ErrorState({
    message,
    isEditMode,
    onRetry,
}: ErrorStateProps) {
    return (
        <article
            role="alert"
            className={`${bibleVerseCardClassName} flex min-h-56 flex-col justify-center`}
        >
            {isEditMode && (
                <EditModeBtn
                    content={<EditModeBibleVerse />}
                    label="Edit Bible verse"
                />
            )}

            <div className="ml-auto flex max-w-sm flex-col items-end">
                <span
                    className="
                        grid size-11 place-items-center
                        rounded-full border border-accent-400/20
                        bg-accent-900/10 text-xl
                        text-accent-400
                    "
                >
                    <FiAlertCircle aria-hidden="true" />
                </span>

                <h3 className="mt-4 text-base font-bold text-white sm:text-lg">
                    We couldn&apos;t load the featured verse
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/60">
                    Please try again. The rest of the page is still available.
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="
                        group mt-5 inline-flex min-h-10
                        items-center justify-center gap-2
                        rounded-full border border-white/15
                        bg-white/[0.06] px-4
                        text-sm font-semibold text-white
                        transition
                        hover:border-primary-900
                        hover:bg-primary-900
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-900
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-neutral-900
                    "
                >
                    <FiRefreshCw
                        aria-hidden="true"
                        className="
                            transition-transform duration-300
                            group-hover:rotate-180
                        "
                    />

                    Try again
                </button>

                {ENV.DEBUG && (
                    <details className="mt-4 max-w-full text-left text-xs text-white/40">
                        <summary className="cursor-pointer text-right">
                            Debug details
                        </summary>

                        <p className="mt-2 break-words rounded-xl bg-black/20 p-3">
                            {message}
                        </p>
                    </details>
                )}
            </div>
        </article>
    );
}

export default function HeroSectionBibleVerse() {
    const { landingSession } = useLandingContext();
    const { isEditMode } = landingSession;

    const [retryCount, setRetryCount] = useState(0);

    const [bibleVerseState, setBibleVerseState] =
        useState<BibleVerseState>({
            status: "fetching",
        });

    useEffect(() => {
        let isCancelled = false;

        const init = async () => {
            setBibleVerseState({
                status: "fetching",
            });

            /*
             * TODO:
             * Replace this request and local state with React Query.
             *
             * The featured verse can use a long staleTime because it changes
             * infrequently. After an administrator updates the verse, invalidate
             * the featured Bible verse query so the new content is refetched.
             */
            try {
                const response =
                    await mockGetFeaturedBibleVerse();

                if (!response.success || !response.data) {
                    throw new Error(
                        getApiResponseErrorMsg(
                            response,
                            "Failed to fetch featured Bible verse",
                        ),
                    );
                }

                if (isCancelled) {
                    return;
                }

                setBibleVerseState({
                    status: "fetched",
                    data: response.data,
                });
            } catch (err) {
                const errorMessage = getTryCatchErrorMsg(
                    err,
                    "Something went wrong while loading the featured Bible verse",
                );

                if (ENV.DEBUG) {
                    console.error(errorMessage);
                }

                if (isCancelled) {
                    return;
                }

                setBibleVerseState({
                    status: "error",
                    message: errorMessage,
                });
            }
        };

        void init();

        return () => {
            isCancelled = true;
        };
    }, [retryCount]);

    if (bibleVerseState.status === "fetching") {
        return <LoadingSkeleton />;
    }

    if (bibleVerseState.status === "error") {
        return (
            <ErrorState
                message={bibleVerseState.message}
                isEditMode={isEditMode}
                onRetry={() => {
                    setRetryCount((count) => count + 1);
                }}
            />
        );
    }

    const { data } = bibleVerseState;
    const verseText = truncateText(data.text);

    return (
        <article className={bibleVerseCardClassName}>
            {isEditMode && (
                <EditModeBtn
                    content={<EditModeBibleVerse />}
                    label="Edit Bible verse"
                />
            )}

            <p className="text-sm font-bold text-primary-900 sm:text-base">
                {data.reference}
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
        </article>
    );
}
