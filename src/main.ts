import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // ตั้งค่า Swagger
  const config = new DocumentBuilder()
    .setTitle('Insure Group API')
    .setDescription(
      'API documentation with JWT authentication for Upskilling and Reskilling programs',
    )
    .setVersion('1.0')
    .addBearerAuth() // เพิ่มการรองรับ Bearer Token สำหรับ JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:4200', // หรือใส่ domain จริงของ frontend
    credentials: true, // ถ้าคุณใช้ cookie หรือ auth header
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

