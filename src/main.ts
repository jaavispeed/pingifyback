import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


    // Configuración global de CORS
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
       allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-Control-Allow-Credentials, Authorization',
      credentials: true,
    });


  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  })
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
