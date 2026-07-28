export const getTryCatchErrorMsg = (err: unknown, fallback: string): string => {
    const errorMessage = err instanceof Error
        ? err.message
        : fallback;
    return errorMessage;
}
