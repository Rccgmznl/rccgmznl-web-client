export const ENV = {
    DEBUG: import.meta.env.VITE_DEBUG === 'true',

    USE_PROXY: import.meta.env.VITE_USE_PROXY === 'true',

    BASE_URL: import.meta.env.VITE_BASE_URL,

    ENABLE_STRICT_MODE: import.meta.env.VITE_ENABLE_STRICT_MODE === 'true',
};
