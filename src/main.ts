import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,

    exceptionFactory: (errors: ValidationError[]) => {
      const extractErrors = (errors: ValidationError[], parentPath = '') => {
        return errors.flatMap(error => {
          const campo = parentPath ? `${parentPath}.${error.property}` : error.property;

          const current = error.constraints
            ? [{ campo, erros: Object.values(error.constraints) }]
            : [];

          const children = error.children?.length
            ? extractErrors(error.children, campo)
            : [];

          return [...current, ...children];
        });
      };

      const formattedErrors = extractErrors(errors);

      return new BadRequestException({
        status: 'erro',
        mensagem: 'Falha na validação dos dados',
        erros: formattedErrors,
      });
    },
  }));

  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
