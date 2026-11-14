import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
      whitelist: true,              // elimina campos que no estén en el DTO
      forbidNonWhitelisted: true,   // lanza 400 si envían campos extra
      transform: true,              // convierte el body a instancias del DTO
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Filtro global de excepciones (respuestas de error consistentes)
  app.useGlobalFilters(new AllExceptionsFilter());

  // CORS habilitado (útil para el frontend / página pública)
  app.enableCors();

  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('Liga Barrial API')
    .setDescription('Sistema de gestión de liga barrial de fútbol')
    .setVersion('1.0')
    .addBearerAuth() // Vital para poder probar las rutas protegidas con JWT en la interfaz
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // La ruta para visualizar la documentación será: http://localhost:3000/api/v1/docs
  SwaggerModule.setup('docs', app, document);
  // --------------------------------

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`🚀 API Liga Barrial en http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger UI en http://localhost:${port}/api/v1/docs`);
  console.log(`📚 Swagger UI en http://localhost:${port}/api/v1/docs`);
}
bootstrap();