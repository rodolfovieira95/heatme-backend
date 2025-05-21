import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

/**
 * Configura a documentação Swagger
 */
export const configureSwagger = (app: NestExpressApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Heat Me Up API')
    .setDescription('API para videochat com amigos e desconhecidos.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Autenticação', 'Endpoints de autenticação')
    .addTag('Usuários', 'Gerenciamento de usuários')
    .addTag('Amizades', 'Gerenciamento de amizades')
    .addTag('Mensagens', 'Gerenciamento de mensagens')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
};
