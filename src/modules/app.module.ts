import { GraphQLModule } from '@nestjs/graphql';
import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as stringify from 'json-stringify-safe';

import { AMQP, ELASTIC, SMS, SMTP } from 'configs';
import { AmqpModule, ElasticModule, HttpModule, JoiModule, SmsModule, SmtpModule } from 'providers';
import { ToobusyMiddleware } from 'middleware';

import { AuthModule } from './auth';
import { CityModule } from './city';
import { UserModule } from './user';
import { WeatherModule } from './weather';

@Module({
  imports: [
    /**
     * System module
     */
    GraphQLModule.forRoot({
      rootValue: {},
      context: ({ req, res }) => ({ req, res }),
      debug: false,
      formatResponse: (res) => {
        try {
          const errors = res.errors;

          JSON.stringify(errors);
        } catch (err) {
          res.errors = JSON.parse(stringify(res.errors));
        }

        return res;
      },
      tracing: false,
      // cache: {}, // todo
      typePaths: [ 'src/**/typedefs/*.graphql' ],
    }),
    HttpModule.forRoot({
      timeout: 1000 * 5,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRoot(),

    /**
     * Common modules
     */
    AmqpModule.forRoot(AMQP),
    ElasticModule.forRoot(ELASTIC),
    JoiModule.forRoot({
      abortEarly: false,
      allowUnknown: true,
    }),
    SmsModule.forRoot(SMS),
    SmtpModule.forRoot(SMTP),

    /**
     * Application modules
     */
    AuthModule,
    CityModule,
    UserModule,
    WeatherModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ToobusyMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
