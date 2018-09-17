import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import * as compression from 'compression';
import * as csurf from 'csurf';
import * as helmet from 'helmet';

import * as Rate from 'express-rate-limit';
import * as Store from 'rate-limit-redis';

import { AppModule } from 'modules';

import { APP, REDIS } from 'configs';

// Authorization: bearer JSON_WEB_TOKEN_STRING
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    /**
     * Security middleware
     */
    app.use(helmet());
    // app.use(csurf()); // TODO
    app.use(new Rate({
      store: new Store({
        url: REDIS.url,
      }),
      windowMs: 15 * 60 * 1000,
      max: 100,
    }));
    app.enableCors(APP.CORS);

    /**
     * Optimization middleware
     */
    app.use(compression());

    /**
     * Initialize microservices
     */
    // app.connectMicroservice({
    //   transport: Transport.REDIS,
    //   options: {
    //     url: REDIS.url,
    //   },
    // });

    // await app.startAllMicroservicesAsync();
    await app.listen(process.env.APP_PORT);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
}

bootstrap();
