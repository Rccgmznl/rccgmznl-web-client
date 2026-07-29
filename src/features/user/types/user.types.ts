export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isAdmin: boolean;

    /**
     * ISO datetime string.
     *
     * Example:
     * "2026-07-16T18:30:00Z"
     */
    createdAt: string;
    updatedAt: string;
}
