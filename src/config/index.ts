import { config } from 'dotenv';
config()

export const envConfig: EnvironmentVariables = {
    port: process.env.PORT || '3000',
    dev: Boolean(process.env.NODE_ENV?.trim() !== 'production'),
    cors: process.env.CORS,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    jwtSecretKey: process.env.JWT_SECRET_KEY
}
