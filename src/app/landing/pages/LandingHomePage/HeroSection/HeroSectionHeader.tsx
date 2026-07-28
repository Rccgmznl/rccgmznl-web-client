import { ENV } from "@config/env";
import { useAuthContext } from "@features/auth";
import { mockLogout } from "@features/auth/api/logout.mock";
import { getApiResponseErrorMsg } from "@services/api.service";
import { getTryCatchErrorMsg } from "@utils/getTryCatchErrorMsg";
import {
    FiEdit3,
    FiGrid,
    FiLoader,
    FiLogOut,
    FiMenu,
    FiSettings,
} from "react-icons/fi";
import {
    useEffect,
    useRef,
    useState,
} from "react";
import { Link, NavLink } from "react-router";

import unavailableImg from "@shared/images/unavailable.png";
import { useLandingContext } from "@app/landing/providers/landing.ctx";

const navigationItems = [
    { label: "Home", to: "/" },
    { label: "I'm New", to: "/im-new" },
    { label: "The Church", to: "/the-church" },
    { label: "Programs", to: "/programs" },
    { label: "Give", to: "/donate" },
];

interface HeaderUser {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string | null;
    role: "admin" | "member";
}

interface HeaderDropDownProps {
    user: HeaderUser;
    onClose: () => void;
}

function HeaderDropDown({
    user,
    onClose,
}: HeaderDropDownProps) {
    const isAdmin = user.role === "admin";
    const fullName = `${user.firstName} ${user.lastName}`;

    const { landingSession, updateLandingSession } = useLandingContext();
    const { isEditMode } = landingSession;

    const onToggleEditMode = () => {
        updateLandingSession({
            ...landingSession,
            isEditMode: !landingSession.isEditMode
        });
    }

    return (
        <div
            id="header-profile-dropdown"
            className="
                absolute right-0 top-[calc(100%+2rem)]
                z-50 w-[min(22rem,calc(100vw-2rem))]
                overflow-hidden rounded-3xl
                border border-white/10
                bg-neutral-900/95 text-white
                shadow-2xl shadow-black/50
                backdrop-blur-xl
            "
        >
            {/* Profile summary */}
            <div className="border-b border-white/10 p-5">
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        <img
                            src={user.avatarUrl || unavailableImg}
                            alt={`${fullName} profile`}
                            className="
                                size-14 rounded-full
                                border-2 border-primary-900
                                bg-neutral-800 object-cover
                            "
                        />

                        <span
                            aria-hidden="true"
                            className="
                                absolute bottom-0 right-0
                                size-3.5 rounded-full
                                border-2 border-neutral-900
                                bg-primary-900
                            "
                        />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-base font-bold">
                                {fullName}
                            </h3>

                            <span
                                className="
                                    rounded-full
                                    bg-primary-900/15
                                    px-2.5 py-1
                                    text-[0.6rem] font-black
                                    uppercase tracking-[0.12em]
                                    text-primary-400
                                "
                            >
                                {isAdmin ? "Administrator" : "Member"}
                            </span>
                        </div>

                        <p className="mt-1 truncate text-sm text-neutral-400">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Account links */}
            <nav aria-label="Account navigation" className="p-2">
                <ul className="space-y-1">
                    <li>
                        <Link
                            to={isAdmin ? "/admin" : "/dashboard"}
                            onClick={onClose}
                            className="
                                group flex items-center gap-3
                                rounded-2xl px-3 py-3
                                transition
                                hover:bg-white/[0.06]
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary-900
                            "
                        >
                            <span
                                className="
                                    grid size-10 shrink-0
                                    place-items-center rounded-xl
                                    bg-neutral-800
                                    text-lg text-neutral-400
                                    transition
                                    group-hover:bg-primary-900/15
                                    group-hover:text-primary-400
                                "
                            >
                                <FiGrid aria-hidden="true" />
                            </span>

                            <span>
                                <span className="block text-sm font-bold">
                                    Dashboard
                                </span>

                                <span className="mt-0.5 block text-xs text-neutral-500">
                                    View your account overview
                                </span>
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/account"
                            onClick={onClose}
                            className="
                                group flex items-center gap-3
                                rounded-2xl px-3 py-3
                                transition
                                hover:bg-white/[0.06]
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary-900
                            "
                        >
                            <span
                                className="
                                    grid size-10 shrink-0
                                    place-items-center rounded-xl
                                    bg-neutral-800
                                    text-lg text-neutral-400
                                    transition
                                    group-hover:bg-primary-900/15
                                    group-hover:text-primary-400
                                "
                            >
                                <FiSettings aria-hidden="true" />
                            </span>

                            <span>
                                <span className="block text-sm font-bold">
                                    Account settings
                                </span>

                                <span className="mt-0.5 block text-xs text-neutral-500">
                                    Manage your profile and security
                                </span>
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Admin edit mode */}
            {isAdmin && (
                <div className="border-t border-white/10 p-4">
                    <div
                        className={[
                            `
                                flex items-center gap-3
                                rounded-2xl border p-4
                                transition-colors
                            `,
                            isEditMode
                                ? "border-primary-900/50 bg-primary-900/10"
                                : "border-white/10 bg-neutral-800/70",
                        ].join(" ")}
                    >
                        <span
                            className={[
                                `
                                    grid size-10 shrink-0
                                    place-items-center rounded-xl
                                    text-lg transition-colors
                                `,
                                isEditMode
                                    ? "bg-primary-900 text-white"
                                    : "bg-neutral-700 text-neutral-300",
                            ].join(" ")}
                        >
                            <FiEdit3 aria-hidden="true" />
                        </span>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold">
                                    Live edit mode
                                </h4>

                                <span
                                    className={[
                                        `
                                            text-[0.65rem] font-bold
                                            uppercase tracking-wide
                                        `,
                                        isEditMode
                                            ? "text-primary-400"
                                            : "text-neutral-500",
                                    ].join(" ")}
                                >
                                    {isEditMode ? "On" : "Off"}
                                </span>
                            </div>

                            <p className="mt-1 text-xs leading-5 text-neutral-400">
                                Edit website content directly on the page.
                            </p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-label="Toggle live edit mode"
                            aria-checked={isEditMode}
                            onClick={onToggleEditMode}
                            className={[
                                `
                                    relative h-7 w-12 shrink-0
                                    rounded-full transition-colors
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-primary-900
                                    focus-visible:ring-offset-2
                                    focus-visible:ring-offset-neutral-900
                                `,
                                isEditMode
                                    ? "bg-primary-900"
                                    : "bg-neutral-600",
                            ].join(" ")}
                        >
                            <span
                                aria-hidden="true"
                                className={[
                                    `
                                        absolute left-1 top-1
                                        size-5 rounded-full
                                        bg-white shadow-md
                                        transition-transform duration-200
                                    `,
                                    isEditMode
                                        ? "translate-x-5"
                                        : "translate-x-0",
                                ].join(" ")}
                            />
                        </button>
                    </div>
                </div>
            )}

            {/* Logout */}
            <LogoutBtn />
        </div>
    );
}

interface HeroSectionHeaderProps {
    user?: HeaderUser;
}

export default function HeroSectionHeader({
    user,
}: HeroSectionHeaderProps) {
    const { authState } = useAuthContext();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const isAuthenticated =
        authState.status === "authenticated";

    const profileUser: HeaderUser = user ?? {
        firstName: "First",
        lastName: "Last",
        email: "email@gmail.com",
        avatarUrl: unavailableImg,
        role: "admin",
    };

    useEffect(() => {
        if (!isProfileOpen) {
            return;
        }

        const closeOnOutsideClick = (event: MouseEvent) => {
            if (
                event.target instanceof Node &&
                !profileRef.current?.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        };

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener(
                "mousedown",
                closeOnOutsideClick,
            );

            document.removeEventListener(
                "keydown",
                closeOnEscape,
            );
        };
    }, [isProfileOpen]);

    return (
        <header
            className="
                relative z-30
                border-b border-white/10
                bg-neutral-900/80
                backdrop-blur-md
            "
        >
            <div
                className="
                    mx-auto grid h-20 w-full max-w-[90rem]
                    grid-cols-[minmax(0,1fr)_auto]
                    items-center px-5
                    sm:px-8
                    md:grid-cols-[1fr_auto_1fr]
                    lg:h-24 lg:px-12
                "
            >
                {/* Left: mobile menu and logo */}
                <div className="flex min-w-0 items-center gap-2 justify-self-start">
                    <button
                        type="button"
                        aria-label="Open navigation menu"
                        aria-controls="mobile-navigation"
                        aria-expanded="false"
                        className="
                            grid size-10 shrink-0
                            place-items-center rounded-full
                            text-white transition
                            hover:bg-white/10
                            hover:text-primary-900
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary-900
                            md:hidden
                        "
                    >
                        <FiMenu
                            aria-hidden="true"
                            className="text-2xl"
                        />
                    </button>

                    <Link
                        to="/"
                        aria-label="Mount Zion home"
                        className="group inline-flex min-w-0 items-center gap-3"
                    >
                        <span
                            className="
                                grid size-10 shrink-0
                                place-items-center rounded-full
                                border border-primary-900
                                bg-neutral-900
                                text-[0.65rem] font-bold
                                text-primary-900
                                transition
                                group-hover:bg-primary-900
                                group-hover:text-white
                                lg:size-11
                            "
                        >
                            MZ
                        </span>

                        <span className="hidden leading-none sm:block">
                            <span
                                className="
                                    block text-xs font-bold
                                    uppercase tracking-[0.14em]
                                    text-primary-900
                                "
                            >
                                Mount Zion
                            </span>

                            <span
                                className="
                                    mt-1 block text-[0.55rem]
                                    uppercase tracking-[0.3em]
                                    text-neutral-400
                                "
                            >
                                Church
                            </span>
                        </span>
                    </Link>
                </div>

                {/* Centre: desktop navigation */}
                <nav
                    aria-label="Primary navigation"
                    className="hidden justify-self-center md:block"
                >
                    <ul className="flex items-center gap-6 lg:gap-8">
                        {navigationItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    end={item.to === "/"}
                                    className={({ isActive }) =>
                                        [
                                            `
                                                relative py-2
                                                text-sm font-medium
                                                transition-colors
                                                after:absolute
                                                after:bottom-0
                                                after:left-0
                                                after:h-px
                                                after:bg-primary-900
                                                after:transition-all
                                            `,
                                            isActive
                                                ? "text-primary-900 after:w-full"
                                                : `
                                                    text-neutral-300
                                                    after:w-0
                                                    hover:text-white
                                                    hover:after:w-full
                                                `,
                                        ].join(" ")
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right: login or profile */}
                <div className="justify-self-end">
                    {isAuthenticated ? (
                        <div ref={profileRef} className="relative">
                            <button
                                type="button"
                                aria-label="Open account menu"
                                aria-haspopup="true"
                                aria-expanded={isProfileOpen}
                                aria-controls="header-profile-dropdown"
                                onClick={() =>
                                    setIsProfileOpen((open) => !open)
                                }
                                className="
                                    relative grid size-11
                                    place-items-center rounded-full
                                    transition
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-primary-900
                                    focus-visible:ring-offset-2
                                    focus-visible:ring-offset-neutral-900
                                "
                            >
                                <img
                                    src={
                                        profileUser.avatarUrl ||
                                        unavailableImg
                                    }
                                    alt=""
                                    className={[
                                        `
                                            size-9 rounded-full
                                            border-2 object-cover
                                            transition
                                        `,
                                        isProfileOpen
                                            ? "border-primary-900"
                                            : `
                                                border-white/30
                                                hover:border-primary-900
                                            `,
                                    ].join(" ")}
                                />

                                <span
                                    aria-hidden="true"
                                    className="
                                        absolute bottom-0 right-0
                                        size-3 rounded-full
                                        border-2 border-neutral-900
                                        bg-primary-900
                                    "
                                />
                            </button>

                            {isProfileOpen && (
                                <HeaderDropDown
                                    user={profileUser}
                                    onClose={() => setIsProfileOpen(false)}
                                />
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="
                                inline-flex min-h-10
                                items-center justify-center
                                rounded-full
                                border border-primary-900
                                px-5 text-sm font-semibold
                                text-primary-900 transition
                                hover:bg-primary-900
                                hover:text-white
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary-900
                            "
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}


function LogoutBtn() {
    const { logout } = useAuthContext();
    const [isPending, setIsPending] = useState(false);

    const handleLogout = async () => {
        if (isPending) {
            return;
        }

        setIsPending(true);

        try {
            const response = await mockLogout();

            if (!response.success) {
                throw new Error(
                    getApiResponseErrorMsg(
                        response,
                        "Failed to log out",
                    ),
                );
            }
        } catch (err) {
            const errMsg = getTryCatchErrorMsg(
                err,
                "Server Error: Something went wrong",
            );

            if (ENV.DEBUG) {
                console.error(errMsg);
            }
        } finally {
            /*
             * Clear the local session even when the server request fails.
             * This is reasonable when logout() removes local authentication
             * tokens and redirects away from the authenticated area.
             */
            setIsPending(false);
            logout();
        }
    };

    return (
        <div className="border-t border-white/10 p-2">
            <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={isPending}
                aria-busy={isPending}
                className="
                    group flex w-full items-center gap-3
                    rounded-2xl px-3 py-3
                    text-left transition
                    hover:bg-accent-900/10
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-accent-700
                    disabled:cursor-wait
                    disabled:opacity-60
                    disabled:hover:bg-transparent
                "
            >
                <span
                    className="
                        grid size-10 shrink-0
                        place-items-center rounded-xl
                        bg-accent-900/10
                        text-lg text-accent-600
                    "
                >
                    {isPending ? (
                        <FiLoader
                            aria-hidden="true"
                            className="animate-spin"
                        />
                    ) : (
                        <FiLogOut aria-hidden="true" />
                    )}
                </span>

                <span className="min-w-0">
                    <span
                        className="block text-sm font-bold text-accent-600"
                        aria-live="polite"
                    >
                        {isPending ? "Logging out..." : "Log out"}
                    </span>

                    <span className="mt-0.5 block text-xs text-neutral-500">
                        {isPending
                            ? "Ending your current session"
                            : "End your current session"}
                    </span>
                </span>
            </button>
        </div>
    );
}
