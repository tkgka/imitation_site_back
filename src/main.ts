import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
const DBConnect = require('./DB/index');
DBConnect();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.getHttpAdapter().getInstance().set('etag', false);
  app.disable('x-powered-by')
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
