import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

/**
 * Configura as opções de segurança da aplicação
 */
export const configureSecurity = (app: NestExpressApplication): void => {
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(cookieParser());
};

/**
 * Configura o rate limiting da aplicação
 */
export const configureRateLimit = (app: NestExpressApplication): void => {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message:
        'Muitas requisições deste IP, por favor tente novamente mais tarde',
    }),
  );
};
