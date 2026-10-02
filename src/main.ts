import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global: todas las rutas quedan como /api/v1/...
  app.setGlobalPrefix('api');

  // Versionado por URL (buena práctica REST)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // elimina campos que no estén en el DTO
      forbidNonWhitelisted: true,  // lanza 400 si envían campos extra
      transform: true,             // convierte el body a instancias del DTO
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Filtro global de excepciones (respuestas de error consistentes)
  app.useGlobalFilters(new AllExceptionsFilter());

  // CORS habilitado (útil para el frontend / página pública)
  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API Liga Barrial en http://localhost:${port}/api/v1`);
}
bootstrap();