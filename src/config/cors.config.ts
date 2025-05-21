import { NestExpressApplication } from '@nestjs/platform-express';

/**
 * Configura o CORS da aplicação
 */
export const configureCors = (
  app: NestExpressApplication,
  frontendUrl: string,
): void => {
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  });
};
