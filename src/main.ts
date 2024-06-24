import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomResponseInterceptor } from './common/Interceptors/custom-response.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.useGlobalInterceptors(new CustomResponseInterceptor());
  app.use(cookieParser());

  const config = new DocumentBuilder()
  .setTitle('Simple meetups CRUD')
  .setDescription('The meetups API description')
  .setVersion('1.0')
  .addSecurity('access-token', {
    type: 'apiKey', 
    in: 'cookie', 
    name: 'access-token',
  })
  .addSecurity('refresh-token', {
    type: 'apiKey', 
    in: 'cookie', 
    name: 'refresh-token',
  })
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

bootstrap();
