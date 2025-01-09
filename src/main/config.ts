import dotenv from "dotenv";

dotenv.config();

export const config = {
    environment: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 8069,
    host: process.env.HOSTED_URL || "http://localhost:8069",
    origin: process.env.DAWNGUARD_HOSTED_URL || "http://localhost:8080",
};
