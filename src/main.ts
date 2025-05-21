import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import {
  configureSecurity,
  configureRateLimit,
} from './config/security.config';
import { configureCors } from './config/cors.config';
import { configureSwagger } from './config/swagger.config';

/**
 * Inicializa a aplicação NestJS
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  // Configurações da aplicação
  configureSecurity(app);
  configureRateLimit(app);
  configureCors(
    app,
    configService.get<string>('FRONTEND_URL') || 'http://localhost:3000',
  );
  configureSwagger(app);

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
  console.log(`🚀 Backend rodando em http://localhost:${port}`);
}

bootstrap();
