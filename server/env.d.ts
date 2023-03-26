declare global {
    namespace NodeJS {
        interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: string;
        DATABASE_URL: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_DB: string;
        POSTGRES_HOST: string;
        POSTGRES_PORT: number;
        }
    }
}

export { }