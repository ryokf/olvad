import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Membuang properti JSON yang tidak ada di DTO (Penting untuk keamanan!)
            transform: true, // Otomatis mengubah payload JSON menjadi instance DTO
        }),
    );
    await app.listen(4000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
