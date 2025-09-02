import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiConfig = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('This API describe the authentication system for our app')
    .setVersion('1.0.0')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, apiConfig, {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    });
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
