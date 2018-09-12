import { GraphQLModule } from '@nestjs/graphql';
import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as store from 'cache-manager-redis-store';
import * as stringify from 'json-stringify-safe';

import { AMQP, ELASTIC, REDIS, SMS, SMTP } from 'configs';
import { AmqpModule, CacheModule, ElasticModule, HttpModule, JoiModule, SmsModule, SmtpModule } from 'providers';
import { ToobusyMiddleware } from 'middleware';

import { AuthModule } from './auth';
import { CityModule } from './city';
import { RoleModule } from './role';
import { UserModule } from './user';
import { WeatherModule } from './weather';

@Module({
  imports: [
    /**
     * System module
     */
    CacheModule.register({
      store,
      ttl: 5,
      host: REDIS.host,
      port: REDIS.port,
    }),
    GraphQLModule.forRoot({
      debug: false,
      tracing: false,
      // cache: {}, // TODO
      // resolvers: {}, // TODO
      // schemaDirectives: {}, // TODO
      rootValue: {}, // TODO
      typePaths: ['src/**/typedefs/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
      formatResponse: (res) => {
        try {
          const errors = res.errors;

          JSON.stringify(errors);
        } catch (err) {
          res.errors = JSON.parse(stringify(res.errors));
        }

        return res;
      },
    }),
    HttpModule.register({
      timeout: 1000 * 5,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRoot(),

    /**
     * Common modules
     */
    AmqpModule.register(AMQP),
    ElasticModule.register(ELASTIC),
    JoiModule.register({
      abortEarly: false,
      allowUnknown: true,
    }),
    SmsModule.register(SMS),
    SmtpModule.register(SMTP),

    /**
     * Application modules
     */
    AuthModule,
    CityModule,
    RoleModule,
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
