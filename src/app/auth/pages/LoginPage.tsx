import { useState } from 'react';
import {
    FiAlertCircle,
    FiArrowLeft,
    FiEye,
    FiEyeOff,
    FiLoader,
    FiLock,
    FiLogIn,
    FiMail,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';

import { ENV } from '@config/env';
import { useAuthContext } from '@features/auth';
import type { LoginCredentials } from '@features/auth/types';
import { getApiResponseErrorMsg } from '@services/api.service';
import { getTryCatchErrorMsg } from '@utils/getTryCatchErrorMsg';
import { mockLogin } from '@features/auth/api';

type LoginState =
    | { status: 'idle' }
    | { status: 'pending' }
    | { status: 'error'; message: string };

const PASSWORD_MIN_LENGTH = 4;

interface LoginPasswordInputProps {
    isPending: boolean;
    errorId?: string;
}

function LoginPasswordInput({ isPending, errorId }: LoginPasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white"
                >
                    Password
                </label>

                <Link
                    to="/auth/forgot-password"
                    className="
                        text-xs font-medium text-primary-900
                        transition hover:underline
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-900
                    "
                >
                    Forgot password?
                </Link>
            </div>

            <div className="relative mt-2">
                <span
                    aria-hidden="true"
                    className="
                        pointer-events-none absolute
                        left-4 top-1/2
                        -translate-y-1/2
                        text-neutral-400
                    "
                >
                    <FiLock className="text-base" />
                </span>

                <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                    disabled={isPending}
                    aria-describedby={errorId}
                    placeholder="Enter your password"
                    className="
                        min-h-12 w-full
                        border border-white/10
                        bg-white/8 pl-11 pr-12
                        text-sm text-white
                        outline-none transition
                        placeholder:text-neutral-500
                        hover:border-white/20
                        focus:border-primary-900
                        focus:bg-white/10
                        focus:ring-2
                        focus:ring-primary-900/20
                        disabled:cursor-not-allowed
                        disabled:border-white/5
                        disabled:bg-white/5
                        disabled:text-neutral-500
                    "
                />

                <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                        setShowPassword((visible) => !visible);
                    }}
                    aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                    }
                    className="
                        absolute right-2 top-1/2
                        grid size-8 -translate-y-1/2
                        cursor-pointer place-items-center
                        text-neutral-400 transition
                        hover:text-white
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-900
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    {showPassword ? (
                        <FiEyeOff aria-hidden="true" />
                    ) : (
                        <FiEye aria-hidden="true" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const [loginState, setLoginState] = useState<LoginState>({
        status: 'idle',
    });

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loginState.status === 'pending') {
            return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);

        const emailValue = formData.get('email');
        const passwordValue = formData.get('password');

        if (
            typeof emailValue !== 'string' ||
            typeof passwordValue !== 'string'
        ) {
            setLoginState({
                status: 'error',
                message: 'Please enter your email and password.',
            });

            return;
        }

        const email = emailValue.trim();
        const password = passwordValue;

        if (email.length === 0 || password.length < PASSWORD_MIN_LENGTH) {
            form.reportValidity();
            return;
        }

        setLoginState({ status: 'pending' });

        try {
            const credentials: LoginCredentials = {
                email,
                password,
            };

            const response = await mockLogin(credentials);

            if (!response.success || !response.data) {
                throw new Error(
                    getApiResponseErrorMsg(response, 'Failed to login')
                );
            }

            login(response.data.access);
        } catch (error) {
            const errorMessage = getTryCatchErrorMsg(
                error,
                'Something went wrong while signing in'
            );

            if (ENV.DEBUG) {
                console.error(errorMessage);
            }

            setLoginState({
                status: 'error',
                message: errorMessage,
            });
        }
    };

    return (
        <main
            className="
                relative grid min-h-screen
                place-items-center overflow-hidden
                bg-neutral-900 px-4 py-4
                sm:px-6 sm:py-8
            "
        >
            {/* soft background glow */}
            <div
                aria-hidden="true"
                className="
                    absolute left-1/2 top-1/2 h-[28rem] w-[28rem]
                    -translate-x-1/2 -translate-y-1/2
                    rounded-full bg-primary-900/10 blur-3xl
                "
            />

            <section
                className="
                    relative flex min-h-[70vh] max-h-[calc(100dvh-2rem)]
                    w-full max-w-xl flex-col
                    overflow-y-auto overscroll-contain
                    border border-white/10
                    bg-white/8
                    px-6 py-7
                    shadow-2xl shadow-black/35
                    backdrop-blur-xl
                    sm:max-h-[calc(100dvh-4rem)]
                    sm:px-10 sm:py-9
                "
            >
                {/* top-left back button */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    className="
                        absolute left-4 top-4 z-10
                        grid size-10 shrink-0
                        cursor-pointer place-items-center
                        border border-white/10
                        bg-white/5 text-white
                        transition
                        hover:bg-white/10
                        hover:text-primary-900
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-900
                    "
                >
                    <FiArrowLeft aria-hidden="true" className="text-lg" />
                </button>

                <div className="my-auto w-full py-10 sm:py-12">
                    <div className="mx-auto w-full max-w-md">
                        {/* Heading */}

                        <header className="text-center">
                            <h1
                                className="
                                    text-3xl font-bold tracking-[-0.03em]
                                    text-primary-900 sm:text-4xl
                                "
                            >
                                Welcome back
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-neutral-300">
                                Sign in to continue to your account.
                            </p>
                        </header>
                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            aria-busy={loginState.status === 'pending'}
                            className="mt-8 space-y-5"
                        >
                            {loginState.status === 'error' && (
                                <div
                                    id="login-error"
                                    role="alert"
                                    className="
                                        flex items-start gap-3
                                        border border-accent-900/30
                                        bg-accent-900/10
                                        px-4 py-3
                                        text-sm text-accent-100
                                    "
                                >
                                    <FiAlertCircle
                                        aria-hidden="true"
                                        className="
                                            mt-0.5 shrink-0
                                            text-lg text-accent-600
                                        "
                                    />

                                    <p className="leading-5">
                                        {loginState.message}
                                    </p>
                                </div>
                            )}

                            <fieldset
                                disabled={loginState.status === 'pending'}
                                className="
                                    space-y-5 border-0
                                    p-0 disabled:opacity-80
                                "
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-white"
                                    >
                                        Email address
                                    </label>

                                    <div className="relative mt-2">
                                        <span
                                            aria-hidden="true"
                                            className="
                                                pointer-events-none absolute
                                                left-4 top-1/2
                                                -translate-y-1/2
                                                text-neutral-400
                                            "
                                        >
                                            <FiMail className="text-base" />
                                        </span>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            disabled={
                                                loginState.status === 'pending'
                                            }
                                            aria-describedby={
                                                loginState.status === 'error'
                                                    ? 'login-error'
                                                    : undefined
                                            }
                                            placeholder="you@example.com"
                                            className="
                                                min-h-12 w-full
                                                border border-white/10
                                                bg-white/8 pl-11 pr-4
                                                text-sm text-white
                                                outline-none transition
                                                placeholder:text-neutral-500
                                                hover:border-white/20
                                                focus:border-primary-900
                                                focus:bg-white/10
                                                focus:ring-2
                                                focus:ring-primary-900/20
                                                disabled:cursor-not-allowed
                                                disabled:border-white/5
                                                disabled:bg-white/5
                                                disabled:text-neutral-500
                                            "
                                        />
                                    </div>
                                </div>

                                <LoginPasswordInput
                                    isPending={loginState.status === 'pending'}
                                    errorId={
                                        loginState.status === 'error'
                                            ? 'login-error'
                                            : undefined
                                    }
                                />

                                <button
                                    type="submit"
                                    disabled={loginState.status === 'pending'}
                                    className="
                                        inline-flex min-h-12 w-full
                                        cursor-pointer items-center
                                        justify-center gap-2
                                        bg-primary-900 px-5
                                        text-sm font-semibold text-white
                                        transition
                                        hover:bg-primary-800
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-primary-900
                                        focus-visible:ring-offset-2
                                        focus-visible:ring-offset-neutral-900
                                        disabled:cursor-not-allowed
                                        disabled:bg-primary-900/60
                                        disabled:text-white/70
                                    "
                                >
                                    {loginState.status === 'pending' ? (
                                        <>
                                            <FiLoader
                                                aria-hidden="true"
                                                className="animate-spin text-lg"
                                            />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <FiLogIn aria-hidden="true" />
                                            Login
                                        </>
                                    )}
                                </button>
                            </fieldset>
                        </form>
                        <p className="mt-6 text-center text-xs text-neutral-400">
                            Use your registered church account details to sign
                            in.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
