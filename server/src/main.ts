import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const configService = app.get(ConfigService);

  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
