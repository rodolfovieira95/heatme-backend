import 'dotenv/config';

export const DB_HOST = String(process.env.DB_HOST);
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USERNAME = String(process.env.DB_USERNAME);
export const DB_PASSWORD = String(process.env.DB_PASSWORD);
export const DB_NAME = String(process.env.DB_NAME);

export const JWT_SECRET = String(process.env.JWT_SECRET);
export const NODE_ENV = String(process.env.NODE_ENV);
