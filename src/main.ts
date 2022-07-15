import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
const DBConnect = require('./DB/index');
DBConnect();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.getHttpAdapter().getInstance().set('etag', false);
  app.disable('x-powered-by')
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
