declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: number;
      DATABASE_URL: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_REJECTUNAUTHORIZED: boolean;
    }
    interface ChartData {
      row: {
        id: number | string;
        datetime: string[];
        price: string[];
      };
    }
  }
}

export { ChartData };
