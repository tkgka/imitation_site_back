import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const DBConnect = require('./DB/index');
DBConnect();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
