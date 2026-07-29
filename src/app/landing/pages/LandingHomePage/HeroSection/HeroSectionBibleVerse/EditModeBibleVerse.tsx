import { useState } from 'react';
import { FiAlertCircle, FiBookOpen, FiLoader, FiSave } from 'react-icons/fi';

import { ENV } from '@config/env';
import { useUpdateFeaturedBibleVerse } from '@features/featuredBibleVerse';
import type { FeaturedBibleVerse } from '@features/featuredBibleVerse/types';
import { useModalContext } from '@features/modal/providers';

interface EditModeBibleVerseProps {
    bibleVerse: FeaturedBibleVerse;
}

type BibleVerseField = keyof FeaturedBibleVerse;

interface TouchedFields {
    reference: boolean;
    text: boolean;
}

/*
 * Trim user input before comparison and submission so leading or
 * trailing whitespace does not create meaningless content changes.
 */
function normalizeBibleVerse(
    bibleVerse: FeaturedBibleVerse
): FeaturedBibleVerse {
    return {
        reference: bibleVerse.reference.trim(),
        text: bibleVerse.text.trim(),
    };
}

export default function EditModeBibleVerse({
    bibleVerse,
}: EditModeBibleVerseProps) {
    const { closeModal } = useModalContext();

    const updateFeaturedBibleVerse = useUpdateFeaturedBibleVerse();

    const [formState, setFormState] = useState<FeaturedBibleVerse>(() => ({
        reference: bibleVerse.reference,
        text: bibleVerse.text,
    }));

    const [touchedFields, setTouchedFields] = useState<TouchedFields>({
        reference: false,
        text: false,
    });

    const normalizedInitialState = normalizeBibleVerse(bibleVerse);

    const normalizedFormState = normalizeBibleVerse(formState);

    const referenceError =
        normalizedFormState.reference.length === 0
            ? 'Bible reference is required.'
            : null;

    const textError =
        normalizedFormState.text.length === 0
            ? 'Verse text is required.'
            : null;

    const noChanges =
        normalizedFormState.reference === normalizedInitialState.reference &&
        normalizedFormState.text === normalizedInitialState.text;

    const isPending = updateFeaturedBibleVerse.isPending;

    const isError = updateFeaturedBibleVerse.isError;

    const isNearCharacterLimit = formState.text.length >= 270;

    const updateField = (field: BibleVerseField, value: string) => {
        /*
         * Clear a previous mutation error once the administrator
         * starts changing the form again.
         */
        if (updateFeaturedBibleVerse.isError) {
            updateFeaturedBibleVerse.reset();
        }

        setFormState((currentState) => ({
            ...currentState,
            [field]: value,
        }));
    };

    const touchField = (field: keyof TouchedFields) => {
        setTouchedFields((currentFields) => ({
            ...currentFields,
            [field]: true,
        }));
    };

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        /*
         * Reveal all validation errors when a submission is attempted.
         */
        setTouchedFields({
            reference: true,
            text: true,
        });

        if (isPending || noChanges || referenceError || textError) {
            return;
        }

        updateFeaturedBibleVerse.mutate(normalizedFormState, {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    return (
        <form
            noValidate
            onSubmit={(event) => {
                void handleSubmit(event);
            }}
            className="flex flex-col"
        >
            {/* Editor heading */}
            <header className="border-b border-neutral-200 pb-5">
                <div className="flex items-start gap-4">
                    <span
                        className="
                            grid size-11 shrink-0
                            place-items-center rounded-2xl
                            bg-primary-900/10
                            text-xl text-primary-900
                        "
                    >
                        <FiBookOpen aria-hidden="true" />
                    </span>

                    <div>
                        <p
                            className="
                                text-xs font-bold uppercase
                                tracking-[0.18em]
                                text-primary-900
                            "
                        >
                            Hero section
                        </p>

                        <h2
                            id="modal-title"
                            className="
                                mt-1 text-xl font-bold
                                tracking-[-0.02em]
                                text-neutral-900
                                sm:text-2xl
                            "
                        >
                            Edit featured Bible verse
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600">
                            Update the Bible reference and verse displayed in
                            the homepage hero section.
                        </p>
                    </div>
                </div>
            </header>

            {/* Form fields */}
            <div className="space-y-6 py-7">
                <div>
                    <label
                        htmlFor="bible-verse-reference"
                        className="block text-sm font-semibold text-neutral-900"
                    >
                        Bible reference
                    </label>

                    <p
                        id="bible-verse-reference-help"
                        className="mt-1 text-xs leading-5 text-neutral-500"
                    >
                        Enter the book, chapter and verse, such as Psalm 100:4.
                    </p>

                    <input
                        id="bible-verse-reference"
                        name="reference"
                        type="text"
                        required
                        maxLength={100}
                        value={formState.reference}
                        disabled={isPending}
                        aria-invalid={
                            touchedFields.reference && Boolean(referenceError)
                        }
                        aria-describedby={[
                            'bible-verse-reference-help',
                            touchedFields.reference && referenceError
                                ? 'bible-verse-reference-error'
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        placeholder="Psalm 100:4"
                        onChange={(event) => {
                            updateField('reference', event.currentTarget.value);
                        }}
                        onBlur={() => {
                            touchField('reference');
                        }}
                        className={`
                            mt-3 min-h-12 w-full
                            rounded-xl border bg-white px-4
                            text-body-1 text-neutral-900
                            outline-none transition
                            placeholder:text-neutral-400
                            disabled:cursor-not-allowed
                            disabled:bg-neutral-100
                            disabled:text-neutral-500
                            ${
                                touchedFields.reference && referenceError
                                    ? `
                                        border-accent-700
                                        focus:border-accent-700
                                        focus:ring-4
                                        focus:ring-accent-900/10
                                    `
                                    : `
                                        border-neutral-300
                                        hover:border-neutral-400
                                        focus:border-primary-900
                                        focus:ring-4
                                        focus:ring-primary-900/10
                                    `
                            }
                        `}
                    />

                    {touchedFields.reference && referenceError && (
                        <p
                            id="bible-verse-reference-error"
                            role="alert"
                            className="mt-2 text-xs font-medium text-accent-700"
                        >
                            {referenceError}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="bible-verse-text"
                        className="block text-sm font-semibold text-neutral-900"
                    >
                        Verse text
                    </label>

                    <p
                        id="bible-verse-text-help"
                        className="mt-1 text-xs leading-5 text-neutral-500"
                    >
                        Keep the verse concise so it remains readable over the
                        hero image.
                    </p>

                    <textarea
                        id="bible-verse-text"
                        name="text"
                        required
                        maxLength={300}
                        rows={7}
                        value={formState.text}
                        disabled={isPending}
                        aria-invalid={touchedFields.text && Boolean(textError)}
                        aria-describedby={[
                            'bible-verse-text-help',
                            'bible-verse-text-limit',
                            touchedFields.text && textError
                                ? 'bible-verse-text-error'
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        placeholder="Enter the featured Bible verse..."
                        onChange={(event) => {
                            updateField('text', event.currentTarget.value);
                        }}
                        onBlur={() => {
                            touchField('text');
                        }}
                        className={`
                            mt-3 w-full resize-y
                            rounded-xl border bg-white
                            px-4 py-3 text-body-1
                            leading-7 text-neutral-900
                            outline-none transition
                            placeholder:text-neutral-400
                            disabled:cursor-not-allowed
                            disabled:bg-neutral-100
                            disabled:text-neutral-500
                            ${
                                touchedFields.text && textError
                                    ? `
                                        border-accent-700
                                        focus:border-accent-700
                                        focus:ring-4
                                        focus:ring-accent-900/10
                                    `
                                    : `
                                        border-neutral-300
                                        hover:border-neutral-400
                                        focus:border-primary-900
                                        focus:ring-4
                                        focus:ring-primary-900/10
                                    `
                            }
                        `}
                    />

                    <div className="mt-2 flex items-start justify-between gap-4">
                        <div>
                            {touchedFields.text && textError && (
                                <p
                                    id="bible-verse-text-error"
                                    role="alert"
                                    className="text-xs font-medium text-accent-700"
                                >
                                    {textError}
                                </p>
                            )}
                        </div>

                        <p
                            id="bible-verse-text-limit"
                            className={[
                                'shrink-0 text-xs font-medium',
                                isNearCharacterLimit
                                    ? 'text-accent-700'
                                    : 'text-neutral-500',
                            ].join(' ')}
                        >
                            {formState.text.length}/300 characters
                        </p>
                    </div>
                </div>

                {isError ? (
                    <aside
                        role="alert"
                        className="
                            flex items-start gap-3 rounded-2xl
                            border border-accent-900/20
                            bg-accent-100 px-4 py-3
                        "
                    >
                        <FiAlertCircle
                            aria-hidden="true"
                            className="
                                mt-0.5 shrink-0 text-lg
                                text-accent-700
                            "
                        />

                        <div>
                            <p className="text-sm font-semibold text-accent-900">
                                Changes could not be saved
                            </p>

                            <p className="mt-1 text-sm leading-6 text-neutral-700">
                                Please check your connection and try again.
                            </p>

                            {ENV.DEBUG && (
                                <p className="mt-2 break-words text-xs text-accent-700">
                                    {updateFeaturedBibleVerse.error.message}
                                </p>
                            )}
                        </div>
                    </aside>
                ) : (
                    <aside
                        className="
                            rounded-2xl
                            border border-primary-900/15
                            bg-primary-900/[0.05]
                            px-4 py-3
                        "
                    >
                        <p className="text-sm leading-6 text-neutral-700">
                            Changes will update the featured verse shown to
                            visitors on the homepage.
                        </p>
                    </aside>
                )}
            </div>

            {/* Form actions */}
            <footer
                className="
                    flex flex-col-reverse gap-3
                    border-t border-neutral-200 pt-5
                    sm:flex-row sm:justify-end
                "
            >
                <button
                    type="button"
                    disabled={isPending}
                    onClick={closeModal}
                    className="
                        inline-flex min-h-11
                        cursor-pointer items-center
                        justify-center rounded-full
                        border border-neutral-300
                        bg-white px-6
                        text-sm font-semibold
                        text-neutral-700 transition
                        hover:border-neutral-400
                        hover:bg-neutral-100
                        hover:text-neutral-900
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-neutral-400
                        focus-visible:ring-offset-2
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isPending || noChanges}
                    aria-busy={isPending}
                    className="
                        inline-flex min-h-11
                        cursor-pointer items-center
                        justify-center gap-2
                        rounded-full bg-primary-900
                        px-6 text-sm font-semibold
                        text-white transition
                        hover:bg-primary-800
                        disabled:cursor-not-allowed
                        disabled:bg-neutral-400
                        disabled:text-neutral-600
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-900
                        focus-visible:ring-offset-2
                    "
                >
                    {isPending ? (
                        <FiLoader aria-hidden="true" className="animate-spin" />
                    ) : (
                        <FiSave aria-hidden="true" />
                    )}

                    {isPending ? 'Saving changes...' : 'Save changes'}
                </button>
            </footer>
        </form>
    );
}
