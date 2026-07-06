declare global {
    interface Window {
        __APP_ENV__: {
            VITE_API_BASE_URL: string;
            VITE_PORT: number;
        };
    }
}