import { DynamicModule, Global, Module } from '@nestjs/common';

import { createConnection, ConnectionOptions } from 'amqp';

import { AMQP_TOKEN } from './constants';
import { AmqpService } from './amqp.service';

@Global()
@Module({})
export class AmqpModule {
  public static register(options: ConnectionOptions = {}): DynamicModule {
    const connection = createConnection(options);

    return {
      module: AmqpModule,
      providers: [
        AmqpService,
        {
          provide: AMQP_TOKEN,
          useFactory: () => {
            return connection;
          },
        },
      ],
      exports: [AmqpService],
    };
  }
}
