import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,

    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(err => ({
        campo: err.property,
        erros: Object.values(err.constraints || {}),
      }));

      return new BadRequestException({
        status: 'erro',
        mensagem: 'Falha na validação dos dados',
        erros: formattedErrors,
      });

    },
  }),
  );

  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
