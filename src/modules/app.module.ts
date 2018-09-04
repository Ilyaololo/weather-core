import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as stringify from 'json-stringify-safe';

import { ApolloServer } from 'apollo-server-express';

import { ELASTIC } from 'configs';
import { ElasticModule, HttpModule, JoiModule } from 'providers';

import { AuthModule } from './auth';
import { CityModule } from './city';
import { UserModule } from './user';
import { WeatherModule } from './weather';

@Module({
  imports: [
    /**
     * System module
     */
    GraphQLModule,
    HttpModule.forRoot({
      timeout: 1000 * 5,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRoot(),

    /**
     * Common modules
     */
    ElasticModule.forRoot(ELASTIC),
    JoiModule.forRoot({
      abortEarly: false,
      allowUnknown: true,
    }),

    /**
     * Application modules
     */
    AuthModule,
    CityModule,
    UserModule,
    WeatherModule,
  ],
})
export class AppModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {
  }

  public configureGraphQL(app: any) {
    const server = new ApolloServer({
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
      schema: this.graphQLFactory.createSchema({
        typeDefs: this.graphQLFactory.mergeTypesByPaths('src/**/typedefs/*.graphql'),
      }),
    });

    server.applyMiddleware({
      app,
      path: '/graphql',
    });
  }
}
