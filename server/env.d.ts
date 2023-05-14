declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            PORT: number;
            DATABASE_URL: string;
            POSTGRES_USER: string;
            POSTGRES_PASSWORD: string;
            POSTGRES_DB: string;
            POSTGRES_HOST: string;
            POSTGRES_PORT: number;
            POSTGRES_REJECTUNAUTHORIZED: boolean;
        }
    }
}

export { }