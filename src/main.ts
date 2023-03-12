import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
      bearerFormat: 'JWT',
    })
    .setTitle('Tasks Management')
    .setDescription('Tasks Management API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8084);
  logger.log(`Application listening on port: 8084`);
  logger.log(`Swaager JSON is vailable on ${await app.getUrl()}/api`);
}
bootstrap();
