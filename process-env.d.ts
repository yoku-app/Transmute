export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            NODE_ENV: "development" | "production" | "test";
            PORT: string;
            HOSTED_URL: string;
            DAWNGUARD_HOSTED_URL: string;
        }
    }
}
