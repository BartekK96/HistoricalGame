import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModuleDev } from './app.module';

async function bootstrap() {

  let app: INestApplication

  if (process.env.NODE_ENV === 'testing') {
    app = await NestFactory.create(AppModuleDev);
  } else {
    // todo: change when repo would be ready
    app = await NestFactory.create(AppModuleDev);
    // app = await NestFactory.create(AppModuleProd);
  }

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();
