import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from 'modules';

import { APP, REDIS } from 'configs';

// Authorization: bearer JSON_WEB_TOKEN_STRING
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // app.connectMicroservice({
    //   transport: Transport.REDIS,
    //   options: REDIS,
    // });

    app.enableCors(APP.CORS);

    // await app.startAllMicroservicesAsync();
    await app.listen(process.env.APP_PORT);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
}

bootstrap();
