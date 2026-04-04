import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 🔥 This makes DTO validation work globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes extra fields
      forbidNonWhitelisted: true, // throws error if extra fields exist
      transform: true, // auto-transform payloads
    }),
  );
  await app.listen(process.env.PORT ?? 3500);
}
bootstrap();
