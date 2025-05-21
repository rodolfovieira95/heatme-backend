import { registerAs } from '@nestjs/config';

/**
 * Configuração das variáveis de ambiente
 */
export const envConfig = registerAs('env', () => ({
  // Database
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT ?? '5432', 10),
  DB_USERNAME: process.env.DB_USERNAME ?? 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'senha',
  DB_NAME: process.env.DB_NAME ?? 'heatme',
  DB_SYNC: process.env.DB_SYNC === 'true',
  DB_LOGGING: process.env.DB_LOGGING === 'true',

  // Application
  PORT: parseInt(process.env.PORT ?? '3001', 10),
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV ?? 'development',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET ?? 'your-secret-key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION ?? '1d',
}));
