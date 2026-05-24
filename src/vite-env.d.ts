/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_USE_PROXY: string;
    readonly VITE_DEBUG: string;
    readonly VITE_ENABLE_STRICT_MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
