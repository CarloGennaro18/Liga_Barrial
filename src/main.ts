import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Prefijo global: todas las rutas quedan como /api/...
  app.setGlobalPrefix('api');

  // 2. Versionado por URI: /api/v1/...
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 3. Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // 4. Filtro global de excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // 5. CORS
  app.enableCors();

  // 6. Swagger
  const config = new DocumentBuilder()
    .setTitle('Liga Barrial API')
    .setDescription('Sistema de gestión de liga barrial de fútbol')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // CLAVE: Swagger se monta en /api/docs (respeta el globalPrefix).
  // Para que aparezca también bajo /api/v1/docs, usamos jsonDocumentUrl
  // y montamos la UI en un path que respete el versionado.
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      // Le decimos a la UI dónde está el JSON para que "Try it out" funcione
      url: '/api/docs-json',
    },
  });

  // 7. Servir el JSON también bajo /api/v1 para que la demo funcione
  //    con el mismo patrón que los endpoints.
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/api/v1/docs-json', (_req: any, res: any) => res.json(document));
  httpAdapter.get('/api/v1/docs', (_req: any, res: any) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Liga Barrial API - Swagger</title>
          <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
          <script>
            SwaggerUIBundle({
              url: '/api/v1/docs-json',
              dom_id: '#swagger-ui',
              presets: [SwaggerUIBundle.presets.apis],
            });
          </script>
        </body>
      </html>
    `);
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 API Liga Barrial en http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger UI en http://localhost:${port}/api/v1/docs`);
}
bootstrap();