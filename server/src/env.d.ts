declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT?: string;
    MONGODB_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_TOKEN: string;
  }
}
